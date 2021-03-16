import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyCgWESROb56nRpjwLKbbqznUCBAS3JyF4A",
  authDomain: "bt3103-week-6-1c318.firebaseapp.com",
  projectId: "bt3103-week-6-1c318",
  storageBucket: "bt3103-week-6-1c318.appspot.com",
  messagingSenderId: "603258958830",
  appId: "1:603258958830:web:07686dd2a90a93d70414ff",
  measurementId: "G-WWWEEN4SB8"
};
  firebase.initializeApp(firebaseConfig);
  var database = firebase.firestore();
  export default database;