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
      <tr key={id || name}>
        <td>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <GoogleMap lon={lon} lat={lat} zoom={12} />
            <div>
              <div style={{ fontWeight: 600 }}>{name}</div>
              <button
                className="btn btn-xs btn-danger"
                onClick={() => this.props.removeWeather(id)}
                title="Remove city"
              >
                Remove
              </button>
            </div>
          </div>
        </td>
        <td>
          <Chart data={temp} color="orange" units="F" />
        </td>
        <td>
          <Chart data={humidity} color="blue" units="%" />
        </td>
        <td>
          <Chart data={pressure} color="green" units="hPa" />
        </td>
      </tr>
    );
  }

  render() {
    const hasResults = Array.isArray(this.props.weather) && this.props.weather.length > 0;
    const { loading, error, lastQuery } = this.props.ui || {};
    return (
      <div className="table-responsive margin-top">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0 }}>Results</h3>
          {hasResults && (
            <button className="btn btn-sm btn-warning" onClick={this.props.clearWeather} title="Clear all">
              Clear All
            </button>
          )}
        </div>
        {loading && (
          <div className="alert alert-info" role="status" style={{ marginTop: 10 }}>
            Loading weather for {lastQuery || 'city'}…
          </div>
        )}
        {!!error && (
          <div className="alert alert-warning" role="alert" style={{ marginTop: 10 }}>
            {error}
          </div>
        )}
        <table className="table table-hover">
          <thead>
            <tr>
              <th>City</th>
              <th>Temperature (F)</th>
              <th>Humidity (RH)</th>
              <th>Pressure (%)</th>
            </tr>
          </thead>
          <tbody>
            {!hasResults ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', color: '#777' }}>
                  Search for a city to see results
                </td>
              </tr>
            ) : (
              this.props.weather.map(this.renderWeather)
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps({ weather, ui }) {
  return { weather, ui };
}

const mapDispatchToProps = { removeWeather, clearWeather };

export default connect(mapStateToProps, mapDispatchToProps)(WeatherList);
