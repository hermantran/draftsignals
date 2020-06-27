const fs = require('fs');
const RAW_DATA_DIR = './data/raw/';
const FORMATTED_DATA_DIR = './data/';

const TYPES = {
  OTHER: 'O',
  CREATURE: 'C',
  LAND: 'L'
};

fs.readdir(RAW_DATA_DIR, function(err, data) {
  if (err) {
    return console.log(err);
  }

  data.forEach(readAndWrite);
});

function readAndWrite(filename) {
  fs.readFile(RAW_DATA_DIR + filename, 'utf8', writeFormattedData);

  function writeFormattedData(err, data) {
    if (err) {
      return console.log(err);
    }
    
    var output = getOutput(data);
    fs.writeFile(FORMATTED_DATA_DIR + filename, JSON.stringify(output), (err, data) => {
      if (err) {
        return console.log(err);
      }
    });
  }
}

function getOutput(data) {
  var parsed = JSON.parse(data),
      isCardArray = parsed.hasOwnProperty('cards'),
      cards = isCardArray ? parsed.cards : parsed,
      output = {};

  if (isCardArray) {
    cards.reduce(convertToLookup, output);
  } else {
    var keys = Object.keys(cards);
    for (var i = 0, len = keys.length; i < len; i++) {
      output[keys[i]] = getFormatted(cards[keys[i]]);
    }
  }

  return output;
}

function getFormatted(card) {
  var colors = card.colorIdentity || ['C'],
      rarity = card.rarity ? card.rarity.substring(0, 1) : undefined,
      type = getType(card.types),
      altName = card.names ? card.names[1] : undefined;

  return {
    cmc: parseInt(card.convertedManaCost, 10) || 0,
    colors: (type === TYPES.LAND) ? 'C' : colors.join(''),
    rarity: rarity,
    type: type,
    altName: altName 
  };
}

function getType(types) {
  if (!types) {
    return TYPES.OTHER;
  }

  if (types.indexOf('Creature') > -1) {
    return TYPES.CREATURE;
  }
  else if (types.indexOf('Land') > -1) {
    return TYPES.LAND;
  } else {
    return TYPES.OTHER;
  }
}

function convertToLookup(obj, card) {
  obj[card.name] = getFormatted(card);
  return obj;
}