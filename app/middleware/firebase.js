import Q from 'q';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyBRV6orJfo6Nf5uXEOuojNA1shoCtglrUE',
  authDomain: 'draftsignals.firebaseapp.com',
  databaseURL: 'https://draftsignals.firebaseio.com'
};

const ref = 'drafts/';

firebase.initializeApp(config);

let cache = {};

export function uploadData(data) {
  let req = firebase.database().ref(ref).push(data),
      key = req.key;
  cache[key] = data;
  return req.then(() => key);
}

export function getData(id) {
  if (cache[id]) {
    return Q.when(cache[id]);
  }

  let dfd = Q.defer();
  firebase.database().ref(`${ref}${id}`).once('value').then(snapshot => {
    let data = snapshot.val();
    if (!data) {
      return dfd.reject('Data not found');
    }
    cache[id] = data;
    dfd.resolve(cache[id]);
  });
  return dfd.promise;
}