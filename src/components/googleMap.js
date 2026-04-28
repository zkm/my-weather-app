import React from 'react';
import { GoogleMap } from '@react-google-maps/api';

const containerStyle = {
  width: '210px',
  height: '150px',
};

export default function MapContainer({ lat, lon, zoom = 12 }) {
  const center = { lat, lng: lon };

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const isLoaded = typeof window !== 'undefined' && !!window.google;

  if (!apiKey) {
    return (
      <div style={containerStyle} className="map-frame">
        Map unavailable (missing API key)
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div style={containerStyle} className="map-frame">
        Loading map...
      </div>
    );
  }

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom}>
      {null}
    </GoogleMap>
  );
}
