import React from "react";
import ReactDOM from "react-dom";
import { Gmaps, Marker, InfoWindow, Circle } from "react-gmaps";

const coords = {
  lat: 51.5258541,
  lng: -0.08040660000006028
};

const params = { v: "3.exp", key: "AIzaSyBgrLgIKh5eh3TBIKuDVif9vnOjIANbstQ" };

class App extends React.Component {
  state = { lat: 0, long: 0, params: null };
  constructor() {
    super();
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        lat: position.coords.latitude,
        long: position.coords.longitude
      });
    });

    fetch(
      "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=2014-01-02",
      {
        method: "GET"
      }
    ).then(function(response) {
      console.log(response);
      this.setState({ params: response.json() });
    });
  }

  onMapCreated(map) {
    map.setOptions({
      disableDefaultUI: true
    });
  }

  onDragEnd(e) {
    console.log("onDragEnd", e);
  }

  onCloseClick() {
    console.log("onCloseClick");
  }

  onClick(e) {
    console.log("onClick", e);
  }

  render() {
    return (
      <Gmaps
        width={"800px"}
        height={"600px"}
        lat={this.state.lat}
        lng={this.state.long}
        zoom={12}
        loadingMessage={"Be happy"}
        params={this.state.params}
        onMapCreated={this.onMapCreated}
      >
        <Marker
          lat={coords.lat}
          lng={coords.lng}
          draggable={true}
          onDragEnd={this.onDragEnd}
        />
        <InfoWindow
          lat={coords.lat}
          lng={coords.lng}
          content={"Hello, React :)"}
          onCloseClick={this.onCloseClick}
        />
        <Circle
          lat={coords.lat}
          lng={coords.lng}
          radius={500}
          onClick={this.onClick}
        />
      </Gmaps>
    );
  }
}

// ReactDOM.render(<App />, document.getElementById("gmaps"));
export default App;
