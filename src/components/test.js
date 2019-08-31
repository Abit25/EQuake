import React from "react";
import ReactDOM from "react-dom";

class Test extends React.Component {
  componentDidMount() {
    var map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: { lat: -28, lng: 137 }
    });

    // NOTE: This uses cross-domain XHR, and may not work on older browsers.
    map.data.loadGeoJson(
      "https://storage.googleapis.com/mapsdevsite/json/google.json"
    );
  }
  render() {
    return <div id="map"></div>;
  }
}
