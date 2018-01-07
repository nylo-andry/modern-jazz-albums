import '@sass/main.scss';

import Elm from '@elm/Main.elm';
import firebase from '@js/firebase';

const app = Elm.Main.fullscreen();

firebase(app);
