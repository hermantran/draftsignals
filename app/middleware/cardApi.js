import axios from 'axios';

const API = '/data/';
let cache = {};

export const getSet = (set) => {
  if (!cache[set]) {
    cache[set] = axios.get(`${API}${set}.json`)
      .then(response => response.data)
      .catch(() => { return {}; });
  }

  return cache[set];
};

export const getAllCards = () => {
  if (!cache.allCards) {
    cache.allCards = axios.get(`${API}AllCards.json`)
      .then(response => response.data)
      .catch(() => { return {}; });
  }

  return cache.allCards;
};