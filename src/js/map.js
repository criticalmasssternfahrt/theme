function drawelement(element, map){
  return function (data) {
    var geojson = L.geoJson(data, {
      style: L.mapbox.simplestyle.style,

      pointToLayer: function(feature, latlng) {
        return new L.marker(latlng, {
          icon: L.mapbox.marker.icon(feature.properties),
          title: feature.properties.Treffpunkt + ": " + feature.properties.Zeit,
          riseOnHover: true
        });
      },

      onEachFeature: function (feature, layer) {
        var popupContent = "";

        if (feature.geometry.type === "LineString") {
          popupContent += "<div style=\"text-align:center;\">"
            + feature.properties.Strecke;

          if (feature.properties.image) {
            popupContent += "<br>"
            + "<span class=\"fa fa-bicycle\"></span>&nbsp;"
            + "<strong>" + feature.properties.Distanz + "</strong>";
          }

          popupContent += "</div>";

        } else {
          popupContent += "<div style='text-align:center;'>"
            + "<strong>" + feature.properties.Ort + "</strong><br>"
            + "<i>Treffpunkt:</i> <mark>" + feature.properties.Treffpunkt + "</mark><br>"
            + "<span class=\"fa fa-clock-o\"></span> <mark>" + feature.properties.Zeit + "</mark>";

          if (feature.properties.image) {
            popupContent += "<img "
              + "src=\"" + feature.properties.image.src + "\" "
              + "alt=\"" + feature.properties.image.alt + "\" "
              + "class=\"img-rounded\" width=\"100%\">";
          }

          popupContent += "</div>";
        }

        layer.bindPopup(popupContent);
      }
    });
    geojson.addTo(map);
    //map.fitBounds(geojson.getBounds());
  }
}

function makeMap(mapsources, element) {
  L.mapbox.accessToken = 'pk.eyJ1IjoibWl0cmFkc3R1dHRnYXJ0IiwiYSI6ImNaSko4cHcifQ.46Jz7d_F7BoNcrIiBLYUaQ';

  adjustMapHeight();
  $( window ).resize(function() {
    adjustMapHeight();
  });

  function adjustMapHeight() {
    var winHeight = $( window ).height();
    var height = 850;

    if (winHeight < height) {
      height = 0.7 * winHeight;
    }

    $("#" + element).css("height", height + "px");
  }

  var map = L.mapbox.map(element, 'mapbox.streets', {
    minZoom: 9,
    maxZoom: 18,
    center: [9.18,48.78],
    maxBounds: [[48,8.5],[49.5,9.75]]
  });

  // geojson.addTo(map);

  mapsources.forEach(function(mapsource) {
    $.getJSON(mapsource, drawelement(element, map));
  });

  // Add a legend
  map.legendControl.addLegend("<strong>Critical Mass Sternfahrt</strong><br>12. Juni 2016");

  map.fitBounds([[48.4,8.7],[49,9.6]]);
}
