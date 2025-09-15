import React, { Component } from 'react';
import { LoadScript } from '@react-google-maps/api';
import SearchBar from './containers/searchBar';
import WeatherList from './containers/weatherList';
import './assets/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>React Weather App</h1>
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} id="google-maps-script">
          <SearchBar />
          <WeatherList />
        </LoadScript>
      </div>
    );
  }
}

export default App;
