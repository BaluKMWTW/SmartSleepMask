import firebase from 'firebase/compat/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyAD6GB8eazzw8Ucb-n_prtPFJxE_kXYQ3s",

    authDomain: "sleepqualityanalysis.firebaseapp.com",

    databaseURL: "https://sleepqualityanalysis-default-rtdb.firebaseio.com",

    projectId: "sleepqualityanalysis",

    storageBucket: "sleepqualityanalysis.appspot.com",

    messagingSenderId: "952744294226",

    appId: "1:952744294226:web:faf5d816c103e1184bac8b",

    measurementId: "G-B4LNM19JV6"
}
if (firebase.apps.length == 0) {
    firebase.initializeApp(firebaseConfig)
}

const db = getDatabase();
export { db }