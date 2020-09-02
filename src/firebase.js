import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDdpUAzt4Jt0Lb1VysA_3Fj30mlPbYEys0",
  authDomain: "nc-insta.firebaseapp.com",
  databaseURL: "https://nc-insta.firebaseio.com",
  projectId: "nc-insta",
  storageBucket: "nc-insta.appspot.com",
  messagingSenderId: "651071810608",
  appId: "1:651071810608:web:d9293a079619dfa55f11f5",
  measurementId: "G-X1FM7CE8LX",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

const storage = firebase.storage();

export { db, auth, storage };
