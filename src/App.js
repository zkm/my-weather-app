import React, { Component } from 'react';
import { LoadScript } from '@react-google-maps/api';
import SearchBar from './containers/searchBar';
import WeatherList from './containers/weatherList';
import './assets/App.css';

class App extends Component {
  render() {
    const mapsKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    return (
      <div className="App">
        <h1>React Weather App</h1>
        {mapsKey ? (
          <LoadScript googleMapsApiKey={mapsKey} id="google-maps-script">
            <SearchBar />
            <WeatherList />
          </LoadScript>
        ) : (
          <>
            <SearchBar />
            <WeatherList />
          </>
        )}
      </div>
    );
  }
}

export default App;
