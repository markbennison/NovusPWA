const accountDetails = document.querySelector('.account-details');

const setupUI = (user) => {

    db.collection('users').doc(user.uid).get().then(doc =>{
        const html = `
        <h3>${doc.data().firstname} ${doc.data().lastname} (${doc.data().studentid})</h3>
        <p><strong>Email:</strong> ${user.email}<br />
        <strong>Course subject:</strong> ${doc.data().course}</p>
        `;
        accountDetails.innerHTML = html;
    });
};