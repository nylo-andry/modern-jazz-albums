const app = Elm.Main.fullscreen();

firebase.auth().onAuthStateChanged((user) => {
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
  firebase.auth().signOut();
}

function doLogin(credentials) {
  firebase.auth()
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => firebase.auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .catch((error) => {
        app.ports.loginStateChange.send({ authenticated: false });
      })
    );
}

function fetchAlbums(port) {
  firebase.database().ref('albums')
    .on('value', albums => {
      port.send(albums.val());
    });
}

function subscribeToAlbumListened(port) {
  port.subscribe(([id, listened]) => {
    return firebase.database().ref().child(`/albums/${id}`)
      .update({ listened });
  });
}

function subscribeToLogout(port) {
  port.subscribe(logout);
}