import axios from 'axios';

const API = '/data/';
let cache = {};

export const getSet = (set) => {
  if (!cache[set]) {
    cache[set] = axios.get(API + set + '.json')
      .then(response => response.data)
      .catch(() => { return {}; });
  }

  return cache[set];
};