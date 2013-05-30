var positionChanged = false; // La primera vegada ha de ser true o no canvia res mai


function initialise() {
    prepareGeolocation();
    doGeolocation();
    //positionSuccess({coords:{latitude: 35, longitude: 39}}); // Per probar que ho estic posant bé
}

function doGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(positionSuccess, positionError);
    } else {
        positionError(-1);
    }
}

function positionError(err) {
    var msg;
    switch (err.code) {
    case err.UNKNOWN_ERROR:
        msg = "Unable to find your location";
        break;
    case err.PERMISSION_DENINED:
        msg = "Permission denied in finding your location";
        break;
    case err.POSITION_UNAVAILABLE:
        msg = "Your location is currently unknown";
        break;
    case err.BREAK:
        msg = "Attempt to find location took too long";
        break;
    default:
        msg = "Location detection not supported in browser";
    }
    console.info(msg);
    // document.getElementById('info').innerHTML = msg;
}

function positionSuccess(position) {
    // Get coordinates
    var coords = position.coords || position.coordinate || position;
    var latLng = new google.maps.LatLng(coords.latitude, coords.longitude);

    // Store them in the form hidden input 
    if (coords.latitude != document.getElementById('lat').value) {
        positionChanged = true;
        document.getElementById('lat').value = coords.latitude;
    }
    // console.info(document.getElementById('lat').value);
    if (coords.longitude != document.getElementById('lng').value) {
        positionChanged = true;
        document.getElementById('lng').value = coords.longitude;
    }
    // console.info(document.getElementById('lng').value);
}