import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWeather, weatherRequest } from '../data/openWeatherAPI';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      term: '',
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  render() {
    const query = this.state.term.trim();
    return (
      <section className="card search-card" aria-label="Search weather by location">
        <form onSubmit={this.onFormSubmit} className="search-form">
          <label htmlFor="cityInput" className="search-label">
            Search city or ZIP
          </label>
          <div className="search-controls">
            <input
              id="cityInput"
              onChange={this.onInputChange}
              value={this.state.term}
              className="search-input"
              type="text"
              placeholder="Chicago, Chicago IL, or 60601"
              aria-label="City or ZIP"
            />
            <button className="search-button" type="submit" disabled={!query}>
              Get forecast
            </button>
          </div>
          <p className="search-hint">Use city, state, or ZIP for faster results.</p>
        </form>
      </section>
    );
  }

  // on form submission
  onFormSubmit(e) {
    e.preventDefault();
    const query = this.state.term.trim();
    if (!query) return;
    this.props.weatherRequest(query);
    this.props.fetchWeather(query);
    //reset form
    this.setState({
      term: '',
    });
  }

  // on any input change we set state within class
  onInputChange(event) {
    this.setState({
      term: event.target.value,
    });
  }
}

function mapStateToProps({ ui }) {
  return { ui };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchWeather, weatherRequest }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

// container setup process
// import connect
// import bindactioncreators
// by binding actions we can use fetchWeather now as this.props to call the action function.
// e.g function mapDispatchToProps(dispatch){
//     return bindActionCreators({fetchWeather}, dispatch)
// }
