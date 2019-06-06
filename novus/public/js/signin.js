/* ********************************** 
   ************** AUTH ************** 
   ********************************** */
// redirect if user already logged in
auth.onAuthStateChanged(user => {
    if (user) {
        console.log("LOGIN: user logged in");
        window.location.replace("account.html");
    }
});


/* ********************************** 
   ************ SIGN UP ************* 
   ********************************** */
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    // sign up the user & add firestore data
    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        return db.collection('users').doc(cred.user.uid).set({
            firstname: signupForm['signup-firstname'].value,
            lastname: signupForm['signup-lastname'].value,
            studentid: signupForm['signup-studentid'].value,
            course: signupForm['signup-course'].value
        });
    }).then(() => {
        signupForm.reset();
        signupForm.querySelector('.error').innerHTML = ''
        window.location.replace("account.html");
    }).catch(err => {
        signupForm.querySelector('.error').innerHTML = err.message;
    });
});

/* ********************************** 
   ************ SIGN IN ************* 
   ********************************** */
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    // log the user in
    auth.signInWithEmailAndPassword(email, password).then((cred) => {
        loginForm.reset();
        loginForm.querySelector('.error').innerHTML = '';
        window.location.replace("account.html");
    }).catch(err => {
        loginForm.querySelector('.error').innerHTML = err.message;
    });

});