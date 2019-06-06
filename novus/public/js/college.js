/* ********** ************************* ********** */
/* ********** Bing Maps and GeoLocation ********** */
/* ********** ************************* ********** */

// Bing Maps Key: AiB3SKY39dKUknPcSJcCZOSoR7zhk8Cdc-jwPOOOpdehWANnAigp5RSm-ealFIoi
// SC Location: 54.892760, -1.408520

const myMap = document.getElementById('myMap');

if (myMap) {
    if (navigator.onLine) {
        let bing = "https://www.bing.com/api/maps/mapcontrol?key=AiB3SKY39dKUknPcSJcCZOSoR7zhk8Cdc-jwPOOOpdehWANnAigp5RSm-ealFIoi&callback=loadMapScenario";
        const script = document.createElement('script');
        script.src = bing;
        script.setAttribute('async', true);
        script.setAttribute('defer', true);
        document.body.appendChild(script);
        document.getElementById('myMap').classList.remove('offline-map');
    } else {
        document.getElementById('myMap').classList.add('offline-map');
    }

}


function loadMapScenario() {
    if (!navigator.geolocation) {
        console.log('Geolocation is not supported by your browser');
    } else {
        console.log('Locating…');
        navigator.geolocation.getCurrentPosition(success, error);
    }
}

function success(position) {
    myLat = position.coords.latitude;
    myLong = position.coords.longitude;
    console.log(myLat);
    console.log(myLong);
    let map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
        center: new Microsoft.Maps.Location(myLat, myLong),

        mapTypeId: Microsoft.Maps.MapTypeId.road,
        zoom: 10
    });
    var pushpin = new Microsoft.Maps.Pushpin(map.getCenter(), {
        title: 'You are here',
        text: 'x',
        color: Microsoft.Maps.Color.fromHex('#000000')
    });
    map.entities.push(pushpin);

    var collegelocation = new Microsoft.Maps.Location(54.892760, -1.408520);
    var collegepin = new Microsoft.Maps.Pushpin(collegelocation, {

        icon: createRedArrow(180),
        anchor: new Microsoft.Maps.Point(12, 12),
        title: 'Sunderland College',
        subTitle: 'Bede Centre',
        text: '*'
        //#0071bc
    });
    //Add the pushpin to the map
    map.entities.push(collegepin);


    //Create an infobox that will render in the center of the map.
    var infobox = new Microsoft.Maps.Infobox(center, {
        title: 'Map Center',
        description: 'Seattle'
    });

    //Assign the infobox to a map instance.
    infobox.setMap(map);
}

function error() {
    console.log('Unable to retrieve your location');
    //document.getElementById('myMap').innerHTML = "<p>Can't locate you</p>";
    document.getElementById('myMap').classList.add('offline-map');
}

function createRedArrow(heading) {
    var c = document.createElement('canvas');
    c.width = 24;
    c.height = 24;

    var ctx = c.getContext('2d');

    //Offset the canvas such that we will rotate around the center of our arrow
    ctx.translate(c.width * 0.5, c.height * 0.5);

    //Rotate the canvas by the desired heading
    ctx.rotate(heading * Math.PI / 180);

    //Return the canvas offset back to it's original position
    ctx.translate(-c.width * 0.5, -c.height * 0.5);

    ctx.fillStyle = '#f00';

    //Draw a path in the shape of an arrow.
    ctx.beginPath();
    ctx.moveTo(12, 0);
    ctx.lineTo(6, 15);
    ctx.bezierCurveTo(5,24,19,24,18,15);
    ctx.lineTo(18, 15);
    ctx.lineTo(12, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    //Generate the base64 image URL from the canvas.
    return c.toDataURL();
}

/* ********** ************************* ********** */
/* ******** Load JSON files for contacts ********* */
/* ********** ************************* ********** */
$( document ).ready(function() {
    // 1 - Fetch the file
    fetch("collegecontacts.json").then(function (response) {

        // 2 - Return a new promise (that we will convert the response to json)
        return response.json();

    }).then(function (contacts) {
        const contactList = document.querySelector('.college-contacts');
        // 3 - All going well, we now have valid JSON

        if (contacts.length) {
            let html = '<h3>College Contacts</h3>';
            contacts.forEach(function (contact) {
                html += `
				<address>
				<strong>${contact.name}</strong><br />
				${contact.title}<br />
				<a href="tel:+44${contact.tel.replace(/\s/g, '')}">${contact.tel}</a><br />
				<a href="mailto:${contact.email}">${contact.email}</a>
				</address>
			`
            });
            contactList.innerHTML = html;
        };
    }).catch(function (error) {
        // Error with EITHER of the above promises
        console.log("Error: " + error);
    });
});

const setupUI = (user) => {};