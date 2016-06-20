import Q from 'q';

const regex = {
  set: /-{6}\s[A-Z|\d]{3}\s-{6}\s/,
  setReplace: /(-|\s)/g,
  pick: /Pack\s\d\spick\s\d/,
  pickReplace: /(Pack\s\d\spick\s)|:/g,
  card: /\s{4}|-->\s/,
  selected: /-->\s/,
  reserved: /--:\s/,
  cardReplace: /\s{4}|-->\s|--:\s/
};

export const packCount = 3;
export const pickCount = 15;
export const playerCount = 8;

export const readDraftFile = (file) => {
  let reader = new FileReader(),
      dfd = Q.defer();
      
  reader.readAsText(file);
  reader.onload = () => {
    let data = parseDraftFile(reader.result);
    dfd.resolve(data);
  };

  return dfd.promise;
};

export const parseDraftFile = (text) => {
  let lines = text.split('\n'),
      cards = [],
      reserved = [],
      pack = 0,
      key = 0,
      set,
      pick,
      initial,
      isInPicks;

  lines.forEach(checkLine);
  return cards;

  function checkLine(line) {
    if (regex.set.test(line)) {
      set = line.replace(regex.setReplace, '');
      pack++;
    }
    else if (regex.pick.test(line)) {
      pick = parseInt(line.replace(regex.pickReplace, ''), 10);
      isInPicks = true;      
    }
    else if (regex.reserved.test(line)) {
      let name = line.replace(regex.cardReplace, '');
      reserved.push(name);
    }
    else if (pick && regex.card.test(line)) {
      let name = line.replace(regex.cardReplace, ''),
          isSelected = regex.selected.test(line),
          isReserved = reserved.indexOf(name) > -1,
          isMissing = false;

      checkMissingCards(name);
      addCard({ name, set, pack, pick, isSelected, isReserved, isMissing });
    }
    else if (isInPicks && line.length <= 1) {
      isInPicks = false;
      reserved.length = 0;
      checkMissingCards();
      initial = null;
    }
  }

  function checkMissingCards(name) {
    if (pick <= playerCount) { 
      return;
    }

    let index = 0;
    
    if (!initial) {
      let initalPick = pick - playerCount;
      initial = cards.filter(card => card.pack === pack && card.pick === initalPick);
    }

    initial.some((card) => {
      index++;

      if (card.name === name) {
        return true;
      }

      addCard(Object.assign({}, card, { 
        pick,
        isSelected: false,
        isReserved: false,
        isMissing: true 
      }));
    });

    initial = initial.slice(index, initial.length);
  }

  function addCard(card) {
    card.key = ++key;
    cards.push(card);
  }
};