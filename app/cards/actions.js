import * as types from './actionTypes';
import Q from 'q';

export function uploadCards(e) {
  if (!e.target.files.length) {
    return addCards();
  }

  return (dispatch) => {
    return readFile(e.target.files[0])
    .then(processText)
    .then(cards => dispatch(addCards(cards)));
  };
}

export function addCards(cards = []) {
  return {
    type: types.UPLOAD,
    payload: {
      cards
    }
  };
}

let regex = {
  text: /text.*/,
  querystring: /\?.*/g,
  set: /-{6}\s[A-Z]{3}\s-{6}\s/,
  setReplace: /(-|\s)/g,
  pick: /Pack\s\d\spick\s\d/,
  pickReplace: /(Pack\s\d\spick\s)|:/g,
  card: /\s{4}[A-z|\s|,|'|-]*/,
  cardReplace: /^\s*/g,
  selected: /-->\s[A-z|\s|,|'|-]*/,
  selectedReplace: /-->\s/g
};

function readFile(file) {
  let reader = new FileReader(),
      dfd = Q.defer();
      
  reader.readAsText(file);
  reader.onload = () => {
    dfd.resolve(reader.result);
  };

  return dfd.promise;
}

function processText(text) {
  let lines = text.split('\n'),
      cards = [],
      pack = 0,
      card,
      picks,
      pick,
      set;

  lines.forEach((line) => {
    if (regex.set.test(line)) {
      set = line.replace(regex.setReplace, '');
      pack++;
      cards.push([]);
    }
    else if (regex.pick.test(line)) {
      pick = parseInt(line.replace(regex.pickReplace, ''), 10);
      picks = [];
      cards[pack - 1].push(picks);
    }
    else if (set && regex.selected.test(line)) {
      card = line.replace(regex.selectedReplace, '');
      picks.push(createEntry(card, set, pack, pick, true));
    }
    else if (set && regex.card.test(line)) {
      card = line.replace(regex.cardReplace, '');
      picks.push(createEntry(card, set, pack, pick, false));
    }
  });
    
  return cards;
}

function createEntry(name, set, pack, pick, isSelected) {
  return {
    name,
    set,
    pack,
    pick,
    isSelected
  };
}