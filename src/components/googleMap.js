import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '210px',
  height: '150px',
};

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

export default function MapContainer({ lat, lon, zoom = 12 }) {
  const center = { lat, lng: lon };

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-maps-script',
    googleMapsApiKey: apiKey || '',
  });

  if (!apiKey) {
    return (
      <div style={containerStyle} className="map-frame">
        Map unavailable (missing API key)
      </div>
    );
  }

  if (loadError) {
    return (
      <div style={containerStyle} className="map-frame">
        Map failed to load
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
