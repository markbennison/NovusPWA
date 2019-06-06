/* ********************************** 
   ********** AUTH ********** 
   ********************************** */
// listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('user logged in: ', user);
        setupUI(user);
    } else {
        console.log('user logged out');
        window.location.replace("index.html");
    }
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
    window.location.replace("index.html");
});
