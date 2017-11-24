
var map;
var $xml;
var lines = [];
var elevationBounds;
var hrbounds;
var cadbounds; 

function initMap() {
map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: 55.86, lng: -4.25},
  zoom: 12
});

var styles = [ { "elementType": "geometry", "stylers": [ { "color": "#1d2c4d" } ] }, { "elementType": "labels.text.fill", "stylers": [ { "color": "#8ec3b9" } ] }, { "elementType": "labels.text.stroke", "stylers": [ { "color": "#1a3646" } ] }, { "featureType": "administrative", "elementType": "geometry", "stylers": [ { "visibility": "off" } ] }, { "featureType": "administrative.country", "elementType": "geometry.stroke", "stylers": [ { "color": "#4b6878" } ] }, { "featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [ { "color": "#64779e" } ] }, { "featureType": "administrative.neighborhood", "stylers": [ { "visibility": "off" } ] }, { "featureType": "administrative.province", "elementType": "geometry.stroke", "stylers": [ { "color": "#4b6878" } ] }, { "featureType": "landscape.man_made", "elementType": "geometry.stroke", "stylers": [ { "color": "#334e87" } ] }, { "featureType": "landscape.natural", "elementType": "geometry", "stylers": [ { "color": "#023e58" } ] }, { "featureType": "poi", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi", "elementType": "geometry", "stylers": [ { "color": "#283d6a" } ] }, { "featureType": "poi", "elementType": "labels.text", "stylers": [ { "visibility": "off" } ] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [ { "color": "#6f9ba5" } ] }, { "featureType": "poi", "elementType": "labels.text.stroke", "stylers": [ { "color": "#1d2c4d" } ] }, { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [ { "color": "#023e58" } ] }, { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [ { "color": "#3C7680" } ] }, { "featureType": "road", "elementType": "geometry", "stylers": [ { "color": "#304a7d" } ] }, { "featureType": "road", "elementType": "labels", "stylers": [ { "visibility": "off" } ] }, { "featureType": "road", "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ] }, { "featureType": "road", "elementType": "labels.text.fill", "stylers": [ { "color": "#98a5be" } ] }, { "featureType": "road", "elementType": "labels.text.stroke", "stylers": [ { "color": "#1d2c4d" } ] }, { "featureType": "road.arterial", "elementType": "labels", "stylers": [ { "visibility": "off" } ] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [ { "color": "#2c6675" } ] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [ { "color": "#255763" } ] }, { "featureType": "road.highway", "elementType": "labels", "stylers": [ { "visibility": "off" } ] }, { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [ { "color": "#b0d5ce" } ] }, { "featureType": "road.highway", "elementType": "labels.text.stroke", "stylers": [ { "color": "#023e58" } ] }, { "featureType": "road.local", "stylers": [ { "visibility": "off" } ] }, { "featureType": "transit", "stylers": [ { "visibility": "off" } ] }, { "featureType": "transit", "elementType": "labels.text.fill", "stylers": [ { "color": "#98a5be" } ] }, { "featureType": "transit", "elementType": "labels.text.stroke", "stylers": [ { "color": "#1d2c4d" } ] }, { "featureType": "transit.line", "elementType": "geometry.fill", "stylers": [ { "color": "#283d6a" } ] }, { "featureType": "transit.station", "elementType": "geometry", "stylers": [ { "color": "#3a4762" } ] }, { "featureType": "water", "elementType": "geometry", "stylers": [ { "color": "#0e1626" } ] }, { "featureType": "water", "elementType": "labels.text", "stylers": [ { "visibility": "off" } ] }, { "featureType": "water", "elementType": "labels.text.fill", "stylers": [ { "color": "#4e6d70" } ] } ];
map.set('styles', styles);
      }

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("map").style.marginLeft = "250px";

}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    document.getElementById("map").style.marginLeft = "0";
}

      
var map;
function initMap() {
map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: 55.86, lng: -4.25},
  zoom: 12
});
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function GreenYellowRed(number, max, min) {
  var mid = 50;
  if (number <= mid) {
    // green to yellow
    r = Math.floor(255 * (number / mid));
    g = 255;

  } else {
    // yellow to red
    r = 255;
    g = Math.floor(255 * ((mid-number%mid) / mid));
  }
  b = 0;

  return [r, g, b];
}

var mapEleBounds = function (gpxDoc){
	var min = null;
	var max = null;
	var $xml = $(gpxDoc);
	$xml.find('trkpt').each(function(){
		var elevation = $(this).find('ele').text();

		if (min == null || max == null) {
              min = elevation;
              max = elevation;
            }

            max = Math.max(elevation, max);
            min = Math.min(elevation, min);
	});
	return [min ,max];
};

var mapHRBounds = function (gpxDoc){
	var min = null;
	var max = null;
	var $xml = $(gpxDoc);
	$xml.find('trkpt').each(function(){
		var hr = $(this).find('ns3\\:hr').text();

		if (min == null || max == null) {
              min = hr;
              max = hr;
            }

            max = Math.max(hr, max);
            min = Math.min(hr, min);
	});
	return [min ,max];
};
var mapCadenceBounds = function (gpxDoc){
	var min = null;
	var max = null;
	var $xml = $(gpxDoc);
	$xml.find('trkpt').each(function(){
		var cad = $(this).find('ns3\\:cad').text();

		if (min == null || max == null) {
              min = cad;
              max = cad;
            }

            max = Math.max(cad, max);
            min = Math.min(cad, min);
	});
	return [min ,max];
};


function clearLines(){
	for(var i = 0; i<lines.length; i++){
		if(lines[i] != null){
			lines[i].setMap(null);
			delete lines[i]
			console.log("cleared " + i);
		}
	}
}


$(document).ready(function(){
  
      $("input").change(function(e) {

        for (var i = 0; i < e.originalEvent.srcElement.files.length; i++) {

          var file = e.originalEvent.srcElement.files[i];

          var img = document.createElement("img");
          var reader = new FileReader();
          reader.onloadend = function() {
             img.src = reader.result;
          }
          reader.readAsDataURL(file);
          $("input").after(img);
        }
      });

      $("#elevation").click(function(){
      	clearLines();
      	var lastLat = null;
        var lastLon = null;
      	$xml.find('trkpt').each(function(){
            // this is where all the reading and writing will happen
            var lat = $(this).attr("lat");
            var lon = $(this).attr("lon");
            var elevation = $(this).find('ele').text();
            elepercent = (elevationBounds[1] - elevation)/(elevationBounds[1] - elevationBounds[0]) * 100;

            var rgb = GreenYellowRed(elepercent, elevationBounds[1], elevationBounds[0]);

            var hex = rgbToHex(rgb[0], rgb[1], rgb[2]);

            if (lastLat == null || lastLon == null) {
              lastLat = lat;
              lastLon = lon;
            } else {

              var line = new google.maps.Polyline({
                path: [
                  new google.maps.LatLng(lastLat, lastLon), 
                  new google.maps.LatLng(lat, lon)
                ],

              strokeColor: hex,
              strokeOpacity: 0.4,
              strokeWeight: 10,
              map: map
              });

              lastLon = lon;
              lastLat = lat;
              lines.push(line);
          }


            //  For testing to see if values coming in are mental
            //console.log("LAT " + lat + " LON " + lon + " HR " + hr + " CAD " + cad);
          
          });
      });

      $("#heartrate").click(function(){
      	clearLines();
      	var lastLat = null;
        var lastLon = null;
      	$xml.find('trkpt').each(function(){
            // this is where all the reading and writing will happen
            var lat = $(this).attr("lat");
            var lon = $(this).attr("lon");
            var hr = $(this).find('ns3\\:hr').text();
            hrpercent = (hrbounds[1] - hr)/(hrbounds[1] - hrbounds[0]) * 100;
            var rgb = GreenYellowRed(hrpercent, hrbounds[1], hrbounds[0]);

            var hex = rgbToHex(rgb[0], rgb[1], rgb[2]);

            if (lastLat == null || lastLon == null) {
              lastLat = lat;
              lastLon = lon;
            } else {

              var line = new google.maps.Polyline({
                path: [
                  new google.maps.LatLng(lastLat, lastLon), 
                  new google.maps.LatLng(lat, lon)
                ],

              strokeColor: hex,
              strokeOpacity: 0.4,
              strokeWeight: 10,
              map: map
              });

              lastLon = lon;
              lastLat = lat;
              lines.push(line);
          }


            //  For testing to see if values coming in are mental
            //console.log("LAT " + lat + " LON " + lon + " HR " + hr + " CAD " + cad);
          
          });
      });

      $("#remove").click(function(){
      	clearLines();
      	var lastLat = null;
        var lastLon = null;
      	$xml.find('trkpt').each(function(){
            // this is where all the reading and writing will happen
            var lat = $(this).attr("lat");
            var lon = $(this).attr("lon");
            var hr = $(this).find('ns3\\:hr').text();

            if (lastLat == null || lastLon == null) {
              lastLat = lat;
              lastLon = lon;
            } else {

              var line = new google.maps.Polyline({
                path: [
                  new google.maps.LatLng(lastLat, lastLon), 
                  new google.maps.LatLng(lat, lon)
                ],

              strokeColor: '#FF0000',
              strokeOpacity: 0.4,
              strokeWeight: 10,
              map: map
              });

              lastLon = lon;
              lastLat = lat;
              lines.push(line);
          }


            //  For testing to see if values coming in are mental
            //console.log("LAT " + lat + " LON " + lon + " HR " + hr + " CAD " + cad);
          
          });
      });
      $("#cadence").click(function(){
      	clearLines();
      	var lastLat = null;
        var lastLon = null;
      	$xml.find('trkpt').each(function(){
            // this is where all the reading and writing will happen
            var lat = $(this).attr("lat");
            var lon = $(this).attr("lon");
			var cad = $(this).find('ns3\\:cad').text();
            cadpercent = (cadbounds[1] - cad)/(cadbounds[1] - cadbounds[0]) * 100;

            var rgb = GreenYellowRed(cadpercent, cadbounds[1], cadbounds[0]);

            var hex = rgbToHex(rgb[0], rgb[1], rgb[2]);

            if (lastLat == null || lastLon == null) {
              lastLat = lat;
              lastLon = lon;
            } else {

              var line = new google.maps.Polyline({
                path: [
                  new google.maps.LatLng(lastLat, lastLon), 
                  new google.maps.LatLng(lat, lon)
                ],

              strokeColor: hex,
              strokeOpacity: 0.4,
              strokeWeight: 10,
              map: map
              });

              lastLon = lon;
              lastLat = lat;
              lines.push(line);
          }


            //  For testing to see if values coming in are mental
            //console.log("LAT " + lat + " LON " + lon + " HR " + hr + " CAD " + cad);
          
          });
      });


      $('#file-input').change(function () {
        var reader = new FileReader();
        reader.onload = function(e) {
          // e.target.result should contain the text
          var text=reader.result;

          //console.log("XML TEXT" + text);

          var gpxDoc = $.parseXML(text); 
          $xml = $(gpxDoc);

          // Find Name of Activity
          var $name = $xml.find('name');
          console.log($name.text());

          $('#file-title').text($name.text());


          var totalTracks = 0;
          var totalHR = 0;
          var totalCAD = 0;

          var totalLat = 0;
          var totalLon = 0;

          var lastLat = null;
          var lastLon = null;

          var maxLat = null;
          var maxLon = null;
          var minLat = null;
          var minLon = null;
          elevationBounds = mapEleBounds(gpxDoc);
          hrbounds = mapHRBounds(gpxDoc);
          cadbounds = mapCadenceBounds(gpxDoc);

          // Iterate through all track segements and find a route.
          $xml.find('trkpt').each(function(){
            // this is where all the reading and writing will happen
            var lat = $(this).attr("lat");
            var lon = $(this).attr("lon");

            var hr = $(this).find('ns3\\:hr').text();

            var cad = $(this).find('ns3\\:cad').text();
            var elevation = $(this).find('ele').text();
           
            totalTracks += 1;
            totalHR += parseInt(hr);
            totalCAD += parseInt(cad);
            totalLat += parseFloat(lat);
            totalLon += parseFloat(lon);

            //  Get the figures for the bounding box
            if (maxLat == null || maxLon == null ||  minLat == null || minLon == null ) {
              maxLat = lat;
              minLat = lat;

              maxLon = lon;
              minLon = lon;
            }

            maxLat = Math.max(lat, maxLat);
            minLat = Math.min(lat, minLat);

            maxLon = Math.max(lon, maxLon);
            minLon = Math.min(lon, minLon);

            if (lastLat == null || lastLon == null) {
              lastLat = lat;
              lastLon = lon;
            } else {

              var line = new google.maps.Polyline({
                path: [
                  new google.maps.LatLng(lastLat, lastLon), 
                  new google.maps.LatLng(lat, lon)
                ],

              strokeColor: '#FF0000',
              strokeOpacity: 0.4,
              strokeWeight: 10,
              map: map
              });

              lastLon = lon;
              lastLat = lat;
              lines.push(line);

          }


            //  For testing to see if values coming in are mental
            //console.log("LAT " + lat + " LON " + lon + " HR " + hr + " CAD " + cad);
          
          });

          //  Add the overview stats to preview run details...
          $('#activity-overview').text("Average Heartrate: " + (totalHR/totalTracks) + " Average Cadence: " + (totalCAD/totalTracks));

          // Recentre the MAP
          map.setCenter(new google.maps.LatLng(totalLat/totalTracks, totalLon/totalTracks));

          map.fitBounds(new google.maps.LatLngBounds(new google.maps.LatLng(minLat, minLon),new google.maps.LatLng(maxLat, maxLon)));

        };

        reader.readAsText(this.files[0]);
        $('#file-preview').text(this.files[0].name);


      
      });
    });
    