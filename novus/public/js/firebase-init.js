// Initialize Firebase
var config = {
    apiKey: "AIzaSyDf4Nlx5bYhubnGY21tAvXy8nBJFPLb5LI",
    authDomain: "aquiloniusnovus.firebaseapp.com",
    databaseURL: "https://aquiloniusnovus.firebaseio.com",
    projectId: "aquiloniusnovus",
    //storageBucket: "aquiloniusnovus.appspot.com",
    //messagingSenderId: "183149641053"
};
firebase.initializeApp(config);

// make auth and firestore references
const auth = firebase.auth();
const db = firebase.firestore();