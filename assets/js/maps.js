function initMap() {
    let map = new google.maps.Map(document.getElementById("map"), {
        zoom: 7,
        center: {
            lat: 40.785091,
            lng: -73.968285
        }
    });

    let labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; //each individual letter will appear on a marker

    let locations = [
        { lat: 40.785091, lng: -73.968285 },    //create a locations array with lat & lng set for each marker
        { lat: 41.084045, lng: -73.874245 },
        { lat: 40.754932, lng: -73.984016 }
    ];

    let markers = locations.map(function (location, i) {
        return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
        });
    });

    let markerCluster = new MarkerClusterer(map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});

};

/* var markerCluster = new MarkerClusterer(map, markers, {
     imagePath: "images/maps/"
 }); */


/* Use a built-in JS map() method, it works sim. to a
forEach function but returns an array with the results of looping through each
item in our locations array.  The map() method can take up to 3 arguments, we will
use 2 here. the first is location which is the current value of where we are in the
array as we are looping through. the second is i the index no. of where we currently
are in the array.
Then we return a new google.maps.marker object which will have a position
value set to the current location and a label set to i modulo labels.length to get one of
our labels out of the string that we've created. We use the modullo so that if we have more
than 26 locations it will loop round our string and go from Z back to A instead of throwing an error
Then we add a markerCluster (from GM tutorial) which will create our image and cluster them if nec.
using the clusterer library that we already loaded*/


