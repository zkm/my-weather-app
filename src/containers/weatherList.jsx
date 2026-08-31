import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/googleMap';
import { removeWeather, clearWeather } from '../data/openWeatherAPI';

class WeatherList extends Component {
  renderWeather(cityData) {
    if (!cityData || !cityData.city || !cityData.list) {
      return null;
    }
    const name = cityData.city.name;
    const id = cityData.city.id;
    const temp = cityData.list.map((weather) => weather.main.temp);
    const humidity = cityData.list.map((weather) => weather.main.humidity);
    const pressure = cityData.list.map((weather) => weather.main.pressure);
    const { lon, lat } = cityData.city.coord;

    return (
      <tr key={id || name} className="weather-row">
        <td className="city-cell" data-label="City">
          <div className="city-meta">
            <GoogleMap lon={lon} lat={lat} zoom={12} />
            <div className="city-details">
              <div className="city-name">{name}</div>
              <button
                className="action-button action-danger"
                onClick={() => this.props.removeWeather(id)}
                title="Remove city"
              >
                Remove
              </button>
            </div>
          </div>
        </td>
        <td data-label="Temperature (F)">
          <Chart data={temp} color="orange" units="F" />
        </td>
        <td data-label="Humidity (RH)">
          <Chart data={humidity} color="blue" units="%" />
        </td>
        <td data-label="Pressure (hPa)">
          <Chart data={pressure} color="green" units="hPa" />
        </td>
      </tr>
    );
  }

  render() {
    const hasResults = Array.isArray(this.props.weather) && this.props.weather.length > 0;
    const { loading, error, lastQuery } = this.props.ui || {};
    return (
      <section className="card results-card" aria-live="polite">
        <div className="results-header">
          <h2>Results</h2>
          {hasResults && (
            <button
              className="action-button action-neutral"
              onClick={this.props.clearWeather}
              title="Clear all"
            >
              Clear All
            </button>
          )}
        </div>
        {loading && (
          <div className="status status-info" role="status">
            Loading weather for {lastQuery || 'city'}…
          </div>
        )}
        {!!error && (
          <div className="status status-warning" role="alert">
            {error}
          </div>
        )}
        <div className="results-table-wrap">
          <table className="results-table">
            <thead>
              <tr>
                <th>City</th>
                <th>Temperature (F)</th>
                <th>Humidity (RH)</th>
                <th>Pressure (hPa)</th>
              </tr>
            </thead>
            <tbody>
              {!hasResults ? (
                <tr>
                  <td colSpan="4" className="empty-state">
                    Search for a city to see results
                  </td>
                </tr>
              ) : (
                this.props.weather.map(this.renderWeather)
              )}
            </tbody>
          </table>
        </div>
      </section>
    );
  }
}

function mapStateToProps({ weather, ui }) {
  return { weather, ui };
}

const mapDispatchToProps = { removeWeather, clearWeather };

export default connect(mapStateToProps, mapDispatchToProps)(WeatherList);
