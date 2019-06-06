/* ************************************** 
   * READ DATABASE: USER.REFLECTIVELOGS * 
   ************************************ */
const setupUI = (user) => {
    db.collection('users').doc(user.uid).collection("reflectivelogs").orderBy('date').onSnapshot(snapshot => {
        setupLogs(snapshot.docs);
    });
};

/* ************************************* 
   ****** GET USER.REFLECTIVELOGS ****** 
   ************************************* */

const reflectiveLogList = document.querySelector('.reflectivelogs');
const emptyMessage = document.querySelector('.empty-reflectivelog');
var i = 1;

const setupLogs = (data) => {
    if (data.length) {
        let html = '';
        data.forEach(doc => {
            const log = doc.data();

            var logTimestamp = log.date.toDate();
            var dd = logTimestamp.getDate();
            var mm = logTimestamp.getMonth() + 1;
            var yyyy = logTimestamp.getFullYear();

            var hour = logTimestamp.getHours();
            var min = logTimestamp.getMinutes();
            var sec = logTimestamp.getSeconds();

            dd = (dd < 10 ? "0" : "") + dd;
            mm = (mm < 10 ? "0" : "") + mm;
            hour = (hour < 10 ? "0" : "") + hour;
            min = (min < 10 ? "0" : "") + min;
            sec = (sec < 10 ? "0" : "") + sec;

            var logDate = dd + '/' + mm + '/' + yyyy
            var logTime = hour + ':' + min + ':' + sec;
            console.log(log);
            const accordion = `
					<div class="card">
                        <button class="card-header btn bg-novus text-white collapsed" type="button" id="heading-${i}" data-toggle="collapse" data-target="#collapse-${i}" aria-expanded="false" aria-controls="collapse-${i}">
                        <div class="row">
                            <div class="col-8 text-left my-auto font-weight-bold">${log.task}</div>
                            <div class="col-4"><span class="badge badge-light">${logDate}<br />${logTime}</span></div>
                            </div>
						</button>

						<div id="collapse-${i}" class="collapse" aria-labelledby="heading-${i}" data-parent="#reflectivelog-accordion">
						<div class="card-body">
							<p><strong>Skills developed: </strong> ${log.skills}</p>
							<p><strong>Knowledge developed: </strong> ${log.knowledge}</p>
						</div>
						</div>
					</div>
					`;
            html += accordion;
            i += 1;
        });
        reflectiveLogList.innerHTML = html;
        emptyMessage.innerHTML = '';
    } else {
        emptyMessage.innerHTML = '<h3 class="text-danger text-center">No reflective logs are currently listed.</h3>';
    }
}

/* ********************************** 
   **** SET USER.REFLECTIVELOGS ***** 
   ********************************** */
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('users').doc(firebase.auth().currentUser.uid).collection('reflectivelogs').add({
        date: firebase.firestore.Timestamp.fromDate(new Date()),
        task: createForm.task.value,
        skills: createForm.skills.value,
        knowledge: createForm.knowledge.value
    }).then(() => {
        // close the create modal & reset form
        $(function () {
            $('#modal-create').modal('hide');
        });
        createForm.reset();
    }).catch(err => {
        console.log("ERROR with SET REFLECTIVELOGS: ", err.message);
    });
});