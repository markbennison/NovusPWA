
/*
// Initialize Firestore
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

//var db = firebase.firestore();

*/

/* ********************************** 
   **** READ DATABASE: EMPLOYERS **** 
   ********************************** */
const setupUI = (user) => {
    db.collection("employers").orderBy('employername').onSnapshot(snapshot => {
        setupEmployers(snapshot.docs);
    });
};

/* ********************************** 
   ********* GET EMPLOYERS ********** 
   ********************************** */
const employerList = document.querySelector('.employers');

const setupEmployers = (data) => {
    if (data.length) {
        let html = '';
        data.forEach(doc => {
            const employer = doc.data();
            const accordion = `
					<div class="card">
						<button class="card-header btn bg-novus text-white collapsed" type="button" id="heading-${employer.employername.replace(/\s/g, '')}" data-toggle="collapse" data-target="#collapse-${employer.employername.replace(/\s/g, '')}" aria-expanded="false" aria-controls="collapse-${employer.employername.replace(/\s/g, '')}">
						    <p class="my-0 font-weight-bold">${employer.employername}</p>
						</button>

						<div id="collapse-${employer.employername.replace(/\s/g, '')}" class="collapse" aria-labelledby="heading-${employer.employername.replace(/\s/g, '')}" data-parent="#employer-accordion">
						<div class="card-body">
							<p>${employer.contactname}</p>
							<p>${employer.contactnumber}</p>
							<p>${employer.address}</p>
						</div>
						</div>
					</div>
					`;
            html += accordion;
        });
        employerList.innerHTML = html;
    } else {
        const emptyMessage = document.querySelector('.empty-employers');
        emptyMessage.innerHTML = '<h3 class="text-danger text-center">No employers are currently listed.</h3>';
    }
}

/* ********************************** 
   ********* SET EMPLOYERS ********** 
   ********************************** */
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('employers').add({
        employername: createForm.employername.value,
        contactname: createForm.contactname.value,
        contactnumber: createForm.contactnumber.value,
        address: createForm.address.value
    }).then(() => {
        // close the create modal & reset form
        $(function () {
            $('#modal-create').modal('hides');
        });
        createForm.reset();
    }).catch(err => {
        console.log("ERROR with SET EMPLOYERS: ", err.message);
    });
});