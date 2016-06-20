const fs = require('fs');
const RAW_DATA_DIR = './data/raw/';
const FORMATTED_DATA_DIR = './data/';

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
    
    var cards = JSON.parse(data).cards,
        formatted = cards.map(getFormatted).reduce(convertToLookup, {});

    fs.writeFile(FORMATTED_DATA_DIR + filename, JSON.stringify(formatted));
  }
}

function getFormatted(card) {
  var colors = card.colorIdentity || ['C'];
  return {
    name: card.name,
    cmc: card.cmc || 0,
    colors: colors.join(''),
    rarity: card.rarity.substring(0, 1)
  };
}

function convertToLookup(obj, card) {
  obj[card.name] = {
    cmc: card.cmc,
    colors: card.colors,
    rarity: card.rarity
  };

  return obj;
}