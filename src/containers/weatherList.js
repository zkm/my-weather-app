import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/googleMap';

class WeatherList extends Component {
  renderWeather(cityData) {
    if (!cityData || !cityData.city || !cityData.list) {
      return null;
    }
    const name = cityData.city.name;
    const temp = cityData.list.map((weather) => weather.main.temp);
    const humidity = cityData.list.map((weather) => weather.main.humidity);
    const pressure = cityData.list.map((weather) => weather.main.pressure);
    const { lon, lat } = cityData.city.coord;

    return (
      <tr key={name}>
        <td>
          <GoogleMap lon={lon} lat={lat} zoom={12} />
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
    return (
      <div className="table-responsive margin-top">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>City</th>
              <th>Temperature (F)</th>
              <th>Humidity (RH)</th>
              <th>Pressure (%)</th>
            </tr>
          </thead>
          <tbody>{this.props.weather.map(this.renderWeather)}</tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps({ weather }) {
  return { weather };
}

export default connect(mapStateToProps)(WeatherList);
