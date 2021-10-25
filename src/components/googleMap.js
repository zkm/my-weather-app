import React, { Component } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {
  render() {
    return (
      <Map
      google={this.props.google}
      initialCenter={{lat: this.props.lat, lng: this.props.lon}}
        zoom={14}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process
  .env.REACT_APP_GOOGLE_MAPS_API_KEY
})(MapContainer);
