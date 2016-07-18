import Q from 'q';
import { readTextFile } from './fileReader';
import { getSet } from './cardApi';

const regex = {
  draft: /Event\s#:\s\d*/,
  deck: /^[0-9]{1,2}\s/,
  deckReplace: /([0-9]{1,2}\s)|\r|\n/g,
  set: /-{6}\s[A-Z|\d]{3}\s-{6}\s/,
  setReplace: /(-|\s)/g,
  pick: /Pack\s\d\spick\s\d/,
  pickReplace: /(Pack\s\d\spick\s)|:/g,
  card: /\s{4}|-->\s/,
  selected: /-->\s/,
  reserved: /--:\s/,
  cardReplace: /\s{4}|-->\s|--:\s|\r|\n/g
};

export const packCount = 3;
export const pickCount = 15;
export const playerCount = 8;

export const readDraftAndDeckFile = (draftFile, deckFile) => {
  let data = {};

  return readDraftFile(draftFile)
    .then(storeDraft)
    .then(() => console.log(data))
    .then(() => data);

  function storeDraft({ sets, cards }) {
    data.draft = cards;

    // Deck file is optional
    if (deckFile) {
      return readDeckFile(deckFile, sets)
        .then(storeDeck);
    }
  }

  function storeDeck(cards) {
    data.deck = cards;
  }
};

export const readDeckFile = (file, sets) => {
  return readTextFile(file)
    .then(validateDeckFile)
    .then(parseDeckFile)
    .then(cards => checkDeckSetData({ sets, cards}));
};

export const readDraftFile = (file) => {
  return readTextFile(file) 
    .then(validateDraftFile)
    .then(parseDraftFile)
    .then(checkCardSetData);
};

function validateDeckFile(data) {
  return validateFile(data, regex.deck);
}

function validateDraftFile(data) {
  return validateFile(data, regex.draft);
}

function validateFile(data, firstLineRegex) {
  let firstLine = data.split('\n')[0];

  if (firstLineRegex.test(firstLine)) {
    return data;
  }
    
  return Q.reject({ error: 'Invalid file contents' });
}

function checkDeckSetData({ sets, cards }) {
  return getAllSets(sets).then(lookup => {
    sets.forEach(set => {
      cards.forEach(card => card.set = set);
      addCardData(cards.filter(card => !card.isFound), lookup);
    });

    return cards;
  });
}

function checkCardSetData({ sets, cards }) {
  return getAllSets(sets).then(lookup => {
    return { sets, cards: addCardData(cards, lookup) };
  });
}

function getAllSets(sets) {
  return Q.all(sets.map(set => getSet(set))).then((data) => {
    return sets.reduce((obj, set, i) => {
      obj[set] = data[i];
      return obj;
    }, {});
  });
}

function addCardData(cards, lookup) {
  return cards.map((card) => {
    let data = lookup[card.set][card.name];
    return Object.assign(card, data, {
      isFound: !!data,
      set: data ? card.set : null
    });
  });
}

function parseDeckFile(text) {
  let lines = text.split('\n'),
      cards = [],
      isSideboard = false,
      id = 0;

  lines.forEach(checkLine);
  return cards;

  function checkLine(line) {
    if (regex.deck.test(line)) {
      let quantity = parseInt(line.split('\s')[0], 10),
          name = line.replace(regex.deckReplace, '');
          
      Array(quantity).fill().forEach(() => addCard({ name, isSideboard }));
    } else {
      isSideboard = true;
    }
  }

  function addCard(card) {
    card.id = ++id;
    cards.push(card);
  }
}

function parseDraftFile(text) {
  let lines = text.split('\n'),
      cards = [],
      reserved = [],
      sets = [],
      pack = 0,
      id = 0,
      set,
      pick,
      initial,
      isInPicks;

  lines.forEach(checkLine);
  return { sets, cards };

  function checkLine(line) {
    if (regex.set.test(line)) {
      set = line.replace(regex.setReplace, '');
      sets.push(set);
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
          // isReserved = reserved.indexOf(name) > -1,
          isMissing = false;

      checkMissingCards(name);
      addCard({ name, set, pack, pick, isSelected, isMissing });
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
    card.id = ++id;
    cards.push(card);
  }
}