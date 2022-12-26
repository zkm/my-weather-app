import React, { Component } from "react";
import SearchBar from "./containers/searchBar";
import WeatherList from "./containers/weatherList";
import "./assets/App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>React Weather App</h1>
        <SearchBar />
        <WeatherList />
      </div>
    );
  }
}

export default App;
