
 var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 55.86, lng: -4.25},
          zoom: 12
        });

var styles = [ { "featureType": "all", "elementType": "labels.text.fill", "stylers": [ { "color": "#ffffff" }, { "weight": "0.20" }, { "lightness": "28" }, { "saturation": "23" }, { "visibility": "off" } ] }, { "featureType": "all", "elementType": "labels.text.stroke", "stylers": [ { "color": "#494949" }, { "lightness": 13 }, { "visibility": "off" } ] }, { "featureType": "all", "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [ { "color": "#000000" } ] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [ { "color": "#144b53" }, { "lightness": 14 }, { "weight": 1.4 } ] }, { "featureType": "landscape", "elementType": "all", "stylers": [ { "color": "#08304b" } ] }, { "featureType": "poi", "elementType": "geometry", "stylers": [ { "color": "#0c4152" }, { "lightness": 5 } ] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [ { "color": "#000000" } ] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [ { "color": "#0b434f" }, { "lightness": 25 } ] }, { "featureType": "road.arterial", "elementType": "geometry.fill", "stylers": [ { "color": "#000000" } ] }, { "featureType": "road.arterial", "elementType": "geometry.stroke", "stylers": [ { "color": "#0b3d51" }, { "lightness": 16 } ] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [ { "color": "#000000" } ] }, { "featureType": "transit", "elementType": "all", "stylers": [ { "color": "#146474" } ] }, { "featureType": "water", "elementType": "all", "stylers": [ { "color": "#021019" } ] } ];
map.set('styles', styles);
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



      $('#button').on('click', function() {
        $('#file-input').trigger('click');
      });

      $('#file-input').change(function () {

        var reader = new FileReader();
        reader.onload = function(e) {
          // e.target.result should contain the text
          var text=reader.result;

          //console.log("XML TEXT" + text);

          var gpxDoc = $.parseXML(text); 
          var $xml = $(gpxDoc);

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


          // Iterate through all track segements and find a route.
          $xml.find('trkpt').each(function(){
            // this is where all the reading and writing will happen
            var lat = $(this).attr("lat");
            var lon = $(this).attr("lon");

            var hr = $(this).find('ns3\\:hr').text();

            var cad = $(this).find('ns3\\:cad').text();


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
              strokeColor: "#09b57b",
              strokeOpacity: 0.4,
              strokeWeight: 10,
              map: map
              });

              lastLon = lon;
              lastLat = lat;

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
    