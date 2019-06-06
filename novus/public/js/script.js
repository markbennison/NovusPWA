/* ********** ************** ********** */
/* ********** Service Worker ********** */
/* ********** ************** ********** */

// Check that this browser supports serviceWorker
if ('serviceWorker' in navigator) {

    // Wait for the page to completely load, including all resources like the above photo
    window.addEventListener('load', function () {

        // Register the service worker
        navigator.serviceWorker.register("../serviceworker.js").then(function (registration) {

            // Promise resolved successfully - print registration info to the console
            console.log("Service worker registration was successful!", registration);

        }, function (err) {

            // Promise failed, registration did not work
            console.log("Service worker registration failed!", err);
        });
    });
}


/* ********** ************************* ********** */
/* ********** Network Connection Alerts ********** */
/* ********** ************************* ********** */
const alertHTML_Offline = `
		<div class="alert alert-danger alert-dismissible fade show m-3 fixed-bottom" role="alert">
				No network connection.
			<div id="target"></div>
			<button type="button" class="close" data-dismiss="alert" aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>
		</div>
		`;

const alertHTML_Online = `
		<div class="alert alert-success alert-dismissible fade show m-3 fixed-bottom" role="alert">
				Network connected.
			<div id="target"></div>
			<button type="button" class="close" data-dismiss="alert" aria-label="Close">
				<span aria-hidden="true">&times;</span>
			</button>
		</div>
		`;


var target = document.getElementById('alertArea');
target.innerHTML = navigator.onLine ? '' : alertHTML_Offline;


function handleStateChange() {
    if (!navigator.onLine) {
        target.innerHTML = alertHTML_Offline;
    } else {
        target.innerHTML = alertHTML_Online;
    }
}

window.addEventListener('online', handleStateChange);
window.addEventListener('offline', handleStateChange);
