// This example creates an interactive map which constructs a polyline based on
// user clicks. Note that the polyline only appears once its path property
// contains two LatLng coordinates.

var poly;
var map;
var arr = [];

var directionService;
var directionDisplay;
var startPos = "Chicago";

var endPos = "New York City";

var marker;
var markers = [];
var draw = false;
var storedLatLng = [];


//function to get the id's stored on the page
var getRace = function(){
  var raceId = $("#currRaceID").attr("value");

  //api call to get race info that is on the page
  $.ajax({
    url: "/getRaceInfo/"+raceId,
    method: "GET"
  })
  .done(function(results){
    if(results){
      var route = JSON.parse(results.route);
      bounds  = new google.maps.LatLngBounds();

      poly.setPath(route);

      //adds the start marker
      marker = new google.maps.Marker({
        position: route[0],
        map: map
      });

      loc = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
      bounds.extend(loc);
  
      markers.push(marker);

      //adds the end markers
      marker = new google.maps.Marker({
        position: route[route.length-1],
        map: map
      });

      loc = new google.maps.LatLng(marker.position.lat(), marker.position.lng());
      bounds.extend(loc);
  
      markers.push(marker);

      map.fitBounds(bounds);
      map.panToBounds(bounds);
    }
  });
}


function initMap() {
  directionService = new google.maps.DirectionsService;
  directionDisplay = new google.maps.DirectionsRenderer;

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 7,
    center: {lat: 41.879, lng: -87.624},  // Center the map on Chicago, USA.
    styles: [
              {
                elementType: "geometry",
                stylers: [{ color: "#f5f5f5" }]
              },
              {
                elementType: "labels.icon",
                stylers: [{ visibility: "off" }]
              },
              {
                elementType: "labels.text.fill",
                stylers: [{ color: "#616161" }]
              },
              {
                elementType: "labels.text.stroke",
                stylers: [{ color: "#f5f5f5" }]
              },
              {
                featureType: "administrative.land_parcel",
                elementType: "labels.text.fill",
                stylers: [{ color: "#bdbdbd" }]
              },
              {
                featureType: "poi",
                elementType: "geometry",
                stylers: [{ color: "#eeeeee" }]
              },
              {
                featureType: "poi",
                elementType: "labels.text.fill",
                stylers: [{ color: "#757575" }]
              },
              {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [{ color: "#e5e5e5" }]
              },
              {
                featureType: "poi.park",
                elementType: "labels.text.fill",
                stylers: [{ color: "#9e9e9e" }]
              },
              {
                featureType: "road",
                elementType: "geometry",
                stylers: [{ color: "#ffffff" }]
              },
              {
                featureType: "road.arterial",
                elementType: "labels.text.fill",
                stylers: [{ color: "#757575" }]
              },
              {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [{ color: "#dadada" }]
              },
              {
                featureType: "road.highway",
                elementType: "labels.text.fill",
                stylers: [{ color: "#616161" }]
              },
              {
                featureType: "road.local",
                elementType: "labels.text.fill",
                stylers: [{ color: "#9e9e9e" }]
              },
              {
                featureType: "transit.line",
                elementType: "geometry",
                stylers: [{ color: "#e5e5e5" }]
              },
              {
                featureType: "transit.station",
                elementType: "geometry",
                stylers: [{ color: "#eeeeee" }]
              },
              {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#c9c9c9" }]
              },
              {
                featureType: "water",
                elementType: "geometry.fill",
                stylers: [{ color: "#a3a3a3" }]
              },
              {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [{ color: "#9e9e9e" }]
              }
            ]
  });    

  poly = new google.maps.Polyline({
    strokeColor: "#ff0000",
    strokeOpacity: 1.0,
    strokeWeight: 3
  });
  poly.setMap(map);


  //calls the function to draw the path
  //calculateAndDisplayRoute(directionService, directionDisplay);

  // Add a listener for the click event
  //map.addListener('click', addLatLng);
}

function calculateAndDisplayRoute(directionService, directionDisplay){  
  directionService.route({
    origin: {'lat':data.startLat,'lng':data.startLon},
    destination: {'lat':data.endLat,'lng':data.endLon},
    travelMode: data.type||'DRIVING',
  }, function(response, status){
    if(status === 'OK'){
      console.log(response)
      // directionDisplay.setMap(map);
      // directionDisplay.setDirections(response);

      var path = poly.getPath();
      path.clear();
      storedLatLng = [];
      for(i in response.routes[0].overview_path){
        //path.push(response.routes[0].overview_path[i]);
        storedLatLng.push({
          lat: response.routes[0].overview_path[i].lat(),
          lng: response.routes[0].overview_path[i].lng()
        });

      }
      poly.setPath(storedLatLng);
    } else {
      window.alert(`Direction request failed due to ${status}`);
        //if(i == 1){
         // console.log(response.routes[0].overview_path[i]);
          
         // console.log(response.routes[0].overview_path[i].lat());
         // console.log(response.routes[0].overview_path[i].lng());
        //}

        // if(i == response.routes[0].overview_path.length - 1){
        //   marker = new google.maps.Marker({
        //     position: response.routes[0].overview_path[i],
        //     map: map
        //   });
        // }
      arr = [];
    }
  });
}

// Handles click events on a map, and adds a new point to the Polyline.
function addLatLng(event) {
  console.log(event.latLng)
  //var path = poly.getPath();

  // Because path is an MVCArray, we can simply append a new coordinate
  // and it will automatically appear.
  //path.push(event.latLng); 
  
  if(arr.length < 2){
    // Add a new marker at the new plotted point on the polyline.
    
    marker = new google.maps.Marker({
      position: event.latLng,
      map: map
    });

    markers.push(marker);
    arr.push(event.latLng);
  }

  if(!draw && arr.length == 2){
    draw = true;

    calculateAndDisplayRoute(directionService, directionDisplay);
    
    for(let key in markers) {
      markers[key].setMap(null);
    }
    markers = [];
  }
  console.log(marker)
}

$(document).ready(getRace());
