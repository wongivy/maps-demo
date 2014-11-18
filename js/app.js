/* app.js -- our application code */

"use strict";

// UW coordinates:
// lat: 47.655
// lng: -122.3080

$(document).ready(function() {
   var mapElem = document.getElementById('map');

    function createMap(elem, center, zoom) {
        var map = new google.maps.Map(elem, {
           center: center,
            zoom: zoom
            //mapTypeId: google.maps.MapTypeId.SATELLITE
        });

        var marker = new google.maps.Marker({
            position: center,
            map: map,
            animation: google.maps.Animation.DROP
        });

        var infoWindow = new google.maps.InfoWindow();

        infoWindow.setContent("<h2>Here I am!</h2><p>Don't you wish you were here!</p>");

        google.maps.event.addListener(marker, 'click', function() {
           console.log('marker was clicked!');
            infoWindow.open(map, marker);
        });
    }

    var center = {
        lat: 47.655,
        lng: -122.3080
    };

    function onGeoSuccess(position) {
        var currPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        createMap(mapElem, currPos, 14);
    }

    function onGeoError(error) {
        console.log(error);
        createMap(mapElem, center, 14);
    }

    if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError, {
            enableHighAccuracy: true,
            maximumAge: 100000
        });
    } else {
        createMap(mapElem, center, 14);
    }
});