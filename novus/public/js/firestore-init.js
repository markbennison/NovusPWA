// Initialize Firebase
let firestore = firebase.firestore();
console.log("Cloud Firestores Loaded")

// Enable offline capabilities
firebase.firestore().enablePersistence()
    .then(function () {
        // Initialize Cloud Firestore through firebase
        var db = firebase.firestore();
        console.log("NovusDB: Implemented");
    })
    .catch(function (err) {
        console.log("NovusError: " + err.code);
        if (err.code == 'failed-precondition') {
            // Multiple tabs open, persistence can only be enabled in one tab at a a time.

        } else if (err.code == 'unimplemented') {
            // The current browser does not support all of the
            // features required to enable persistence
            // ...
        }
    });
