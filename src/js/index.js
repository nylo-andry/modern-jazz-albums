import '@sass/main';

import * as firebase from 'firebase';
import Elm from '@elm/Main';

var config = {
  apiKey: "AIzaSyBIgPj96shjFZgpjsh63h1UuZKmhfPDcPE",
  authDomain: "modern-jazz-albums.firebaseapp.com",
  databaseURL: "https://modern-jazz-albums.firebaseio.com",
  projectId: "modern-jazz-albums",
  storageBucket: "modern-jazz-albums.appspot.com",
  messagingSenderId: "869537054623"
};

const firebaseApp = firebase.initializeApp(config);

const app = Elm.Main.fullscreen();

firebaseApp.auth().onAuthStateChanged((user) => {
  if (user) {
    app.ports.loginStateChange.send({ authenticated: true });
    app.ports.login.unsubscribe(doLogin);

    fetchAlbums(app.ports.newAlbums);
    subscribeToAlbumListened(app.ports.albumListened);
    subscribeToLogout(app.ports.logout);
  } else {
    app.ports.loginStateChange.send({ authenticated: false });
    app.ports.login.subscribe(doLogin);
  }
});

function logout() {
  firebaseApp.auth().signOut();
}

function doLogin(credentials) {
  firebaseApp.auth()
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => firebaseApp.auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .catch((error) => {
        app.ports.loginStateChange.send({ authenticated: false });
      })
    );
}

function fetchAlbums(port) {
  firebaseApp.database().ref('albums')
    .on('value', albums => {
      port.send(albums.val());
    });
}

function subscribeToAlbumListened(port) {
  port.subscribe(([id, listened]) => {
    return firebaseApp.database().ref().child(`/albums/${id}`)
      .update({ listened });
  });
}

function subscribeToLogout(port) {
  port.subscribe(logout);
}