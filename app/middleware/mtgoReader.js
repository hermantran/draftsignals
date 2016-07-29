import Q from 'q';
import { readTextFile } from './fileReader';
import { getSet, getAllCards } from './cardApi';

const maxFileLength = 18000;

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
  cardReplace: /\s{4}|-->\s|--:\s|\r|\n/g,
  invalid: /[A-z\s]>|[<\[\]={}\(\)]/
};

let id = 0;

export const packCount = 3;
export const pickCount = 15;
export const playerCount = 8;

export const readDraftAndDeckFile = (draftFile, deckFile) => {
  let data = {};

  return readDraftFile(draftFile)
    .then(storeDraft)
    .then(() => data);

  function storeDraft(draft) {
    data.draft = draft;
    data.title = getTitle(draft);

    // Deck file is optional
    if (deckFile) {
      return readDeckFile(deckFile)
        .then(storeDeck);
    }
  }

  function storeDeck(deck) {
    data.deck = deck;
  }
};

export const parseDraftAndDeckData = ({ draft, deck }) => {
  let data = {};

  return readDraftData(draft)
    .then(storeDraft)
    .then(() => data);

  function storeDraft({ cards, sets }) {
    data.draft = cards;

    if (deck) {
      return readDeckData(deck, sets)
        .then(storeDeck);
    }
  }

  function storeDeck(deck) {
    data.deck = deck;
  }
};

export const readDeckFile = (file) => {
  return readTextFile(file)
    .then(validateDeckFile)
    .then(formatData);
};

export const readDraftFile = (file) => {
  return readTextFile(file) 
    .then(validateDraftFile)
    .then(formatData);
};

export const readDeckData = (data, sets) => {
  let cards = parseDeckData(data);
  return checkDeckSetData({ sets, cards });
};

export const readDraftData = (data) => {
  let cards = parseDraftData(data);
  return checkCardSetData(cards);
};

function getTitle(data) {
  let arr = data.split('\n');
  const event = arr.filter(line => regex.draft.test(line))[0];
  const set = arr.filter(line => regex.set.test(line))
    .join('~').replace(regex.setReplace, '').replace(/~/g, '-');

  return `${event} ${set}`;
}

function validateDeckFile(data) {
  return validateFile(data, regex.deck);
}

function validateDraftFile(data) {
  return validateFile(data, regex.draft);
}

function formatData(data) {
  return data.replace(/\r/g, '');
}

function validateFile(data, firstLineRegex) {
  let firstLine = data.split('\n')[0],
      hasValidFirstLine = firstLineRegex.test(firstLine),
      hasInvalidChars = regex.invalid.test(data),
      isSmallFile = (data.length < maxFileLength);

  if (hasValidFirstLine && !hasInvalidChars && isSmallFile) {
    return data;
  }
    
  return Q.reject({ error: 'Invalid file contents' });
}

function checkDeckSetData({ sets, cards }) {
  let updated = [],
      check = cards;

  return getAllSets(sets).then(lookup => {
    sets.forEach(set => {
      check = check.map(card => { card.set = set; return card; });
      let added = addCardData(check, lookup);
      updated.push(...added.filter(card => card.set));
      check = added.filter(card => !card.set);
    });

    if (check.length) {
      return checkAllCardData(check).then(data => updated.concat(data));
    }

    return updated;
  });
}

function checkAllCardData(cards) {
  return getAllCards().then(lookup => {
    return cards.map(card => Object.assign(card, lookup[card.name]));
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
    if (!data) {
      delete card.set;
    }
    return Object.assign(card, data);
  });
}

function parseDeckData(data) {
  let lines = data.split('\n'),
      cards = [],
      isSideboard = false;
      
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

function parseDraftData(data) {
  let lines = data.split('\n'),
      cards = [],
      reserved = [],
      sets = [],
      pack = 0,
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
          isSelected = regex.selected.test(line);
          // isReserved = reserved.indexOf(name) > -1;

      checkMissingCards(name);
      addCard({ name, set, pack, pick, isSelected });
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