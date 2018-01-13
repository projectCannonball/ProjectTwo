// This example creates an interactive map which constructs a polyline based on
// user clicks. Note that the polyline only appears once its path property
// contains two LatLng coordinates.

var poly;
var map;
var directionService;
var directionDisplay;
var marker;
var markers = [];
var draw = false;
var storedLatLng = [];
var latLon = [];
var distance = null;


//The prototype from Gisgraphy:
GetPointAtDistance = function(metres) {
  // some awkward special cases
  if (metres == 0) return poly.getPath().getAt(0);
  if (metres < 0) return null;
  if (poly.getPath().getLength() < 2) return null;
  var dist=0;
  var olddist=0;
  for (var i=1; (i < poly.getPath().getLength() && dist < metres); i++) {
  olddist = dist;
  dist += google.maps.geometry.spherical.computeDistanceBetween (
    poly.getPath().getAt(i),
    poly.getPath().getAt(i-1)
  );
  }
  if (dist < metres) return null;
  var p1= poly.getPath().getAt(i-2);
  var p2= poly.getPath().getAt(i-1);
  var m = (metres-olddist)/(dist-olddist);
  return new google.maps.LatLng( p1.lat() + (p2.lat()-p1.lat())*m, p1.lng() + (p2.lng()-p1.lng())*m);
}


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

      //sets the route to be drawn for the race
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

      //gets a lat,lng of where the person is at on the path
      var latlng = GetPointAtDistance(parseFloat($("#totalDistance").html())*1609.34);

      //adds the end markers
      marker = new google.maps.Marker({
        position: latlng,
        map: map
      });
    }
  });
}

<<<<<<< HEAD


=======
//draws the Google maps
>>>>>>> 7c1d1de78688595b6c32c85d769cbd62a7e10dba
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

  //draws a polyline
  poly = new google.maps.Polyline({
    strokeColor: "#ff0000",
    strokeOpacity: 1.0,
    strokeWeight: 3
  });
  poly.setMap(map);



  console.log(`Pathname: ${window.location.pathname}`);
  if(window.location.pathname.indexOf("/new/")>-1){
    //calls the function to draw the path
    

    // Add a listener for the click event

    $("#createRace").on("click", function() {
      map.addListener('click', addLatLng);  
    }).then(calculateAndDisplayRoute(directionService, directionDisplay));   

  }
  //calls the function to draw the path
  //calculateAndDisplayRoute(directionService, directionDisplay);

  // Add a listener for the click event
  //map.addListener('click', addLatLng);
}

function calculateAndDisplayRoute(directionService, directionDisplay){  
  directionService.route({
    origin: arr[0], //{'lat':data.startLat,'lng':data.startLon},
    destination: arr[1], //{'lat':data.endLat,'lng':data.endLon},
    travelMode: 'DRIVING', //data.type||
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

  //Add a listener for the click event
  if(window.location.pathname.indexOf("/new/") != -1)
    map.addListener('click', addLatLng);
}

//function to run for the direction features of Google maps
function calculateAndDisplayRoute(directionService, directionDisplay){
  var start = null;
  var end = null;
  var goodToGo = false;

  if($("#startLocation").val() && $("#endLocation").val()){
    start = $("#startLocation").val();
    end = $("#endLocation").val();
    goodToGo = true;
  }
  else if(latLon.length >= 2)
    goodToGo = true;

  if(goodToGo){
    directionService.route({
      origin: start || latLon[0],
      destination: end || latLon[1],
      travelMode: $("select[name=type]").val()||'BICYCLING',
    }, function(response, status){
      if(status === 'OK'){
        console.log(response)
        directionDisplay.setMap(map);
        directionDisplay.setDirections(response);

        distance = response.routes[0].legs[0].distance.value;

        storedLatLng = [];
        for(i in response.routes[0].overview_path){
          //path.push(response.routes[0].overview_path[i]);
          storedLatLng.push({
            lat: response.routes[0].overview_path[i].lat(),
            lng: response.routes[0].overview_path[i].lng()
          });
        }
      } else {
        window.alert('Direction request failed due to '+status);

      }
    });
  }
}

// Handles click events on a map, and adds a new point to the Polyline.
function addLatLng(event) {
  console.log(event.latLng)
  
  if(markers.length >= 2){
    draw = false;

    for(let key in markers) {
      markers[key].setMap(null);
    }
    markers = [];
    latLon = [];
    directionDisplay.setMap(null);
  }
  
  if(markers.length < 2){
    // Add a new marker at the new plotted point on the polyline.
    
    marker = new google.maps.Marker({
      position: event.latLng,
      map: map
    });

    markers.push(marker);

    latLon.push(event.latLng);
  }

  if(!draw && markers.length == 2){
    draw = true;

    calculateAndDisplayRoute(directionService, directionDisplay);
    
    for(let key in markers) {
      markers[key].setMap(null);
    }
    //markers = [];
  }
}

<<<<<<< HEAD


$(document).ready(getRace());
=======
$(document).ready(function(){
    if(window.location.pathname.indexOf("/new/") == -1)
      getRace();

    $("#mapRace").on("click", function(){
      calculateAndDisplayRoute(directionService, directionDisplay);
    });

    $("#createRace").on("click", function(){
      createRace();
    });
  }
);

//populates the race table with the new race data
function createRace(){
  var start = null;
  var end = null;
  var goodToGo = false;

  if($("#startLocation").val() && $("#endLocation").val()){
    start = $("#startLocation").val();
    end = $("#endLocation").val();
    goodToGo = true;
    sendRaceInfo(start, end);
  }
  else if(latLon.length >= 2){
    goodToGo = true;
  }
    

  if(goodToGo){
    if(!start)
    $.ajax({
      url: "http://maps.googleapis.com/maps/api/geocode/json?latlng="+latLon[0].lat()+","+latLon[0].lng()+"&sensor=true",
      method: "GET"
    }).done(function(response){
      start = response.results[0].formatted_address;

      $.ajax({
        url: "http://maps.googleapis.com/maps/api/geocode/json?latlng="+latLon[1].lat()+","+latLon[1].lng()+"&sensor=true",
        method: "GET"
      }).done(function(response){
        end = response.results[0].formatted_address;

        sendRaceInfo(start, end);
      });
    });
  };
}

//sends the create race info to the api
function sendRaceInfo(start, end){
  var info = {
    raceName: $("input[name=raceName").val(),
    raceDesc: $("#raceDesc").val(),
    startDate: $("#startDate").val(),
    endDate: $("#endDate").val(),
    startLoc: start,
    endLoc: end,
    type: $("select[name=type]").val(),
    route: JSON.stringify(storedLatLng),
    distance: distance
  };
  console.log(storedLatLng)

  $.ajax({
    url: "/createNewRace/"+$("#currUserID").attr("value"),
    method: "POST",
    data: info
  }).done(function(response){
    location.pathname = "/"+$("#currUserID").attr("value");
  });
}
>>>>>>> 7c1d1de78688595b6c32c85d769cbd62a7e10dba
