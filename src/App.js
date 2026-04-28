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
        <div className="bg-shape bg-shape-one" aria-hidden="true" />
        <div className="bg-shape bg-shape-two" aria-hidden="true" />
        <main className="app-shell">
          <header className="app-header">
            <p className="eyebrow">Forecast Dashboard</p>
            <h1>Track local weather with clarity</h1>
            <p className="subhead">
              Search by city or ZIP to compare temperature, humidity, and pressure trends in one
              place.
            </p>
          </header>

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
        </main>
      </div>
    );
  }
}

export default App;
