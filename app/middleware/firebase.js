import Q from 'q';
import firebase from 'firebase/app';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyBRV6orJfo6Nf5uXEOuojNA1shoCtglrUE',
  authDomain: 'draftsignals.firebaseapp.com',
  databaseURL: 'https://draftsignals.firebaseio.com'
};

const dataRef = 'drafts/';
const latestRef = 'latest/';

firebase.initializeApp(config);

let cache = {};

export function uploadData(data) {
  let req = firebase.database().ref(dataRef).push(data),
      id = req.key;

  firebase.database().ref(latestRef).push({ id });
  cache[id] = Q.when(data);
  return req.then(() => id);
}

export function getData(id) {
  if (!cache[id]) {
    cache[id] = firebase.database().ref(`${dataRef}${id}`).once('value')
      .then(snapshot => {
        return Object.assign({}, snapshot.val(), { id });
      });
  }

  return cache[id];
}

export function getLatest() {
  if (!cache.latest) {
    cache.latest = firebase.database().ref(latestRef).limitToLast(5).once('value')
      .then(snapshot => {
        let data = snapshot.val(),
            ids = Object.keys(data).reverse().map(key => data[key].id);
        return Q.all(ids.map(getData));
      });
  }

  return cache.latest;
}