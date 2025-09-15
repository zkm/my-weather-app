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
    return (
      <form onSubmit={this.onFormSubmit} className="input-group margin-top">
        <label htmlFor="cityInput" className="sr-only">City</label>
        <input
          id="cityInput"
          onChange={this.onInputChange}
          value={this.state.term}
          className="form-control"
          type="text"
          placeholder="Enter city or ZIP (e.g., Chicago, Chicago, IL, or 60601)"
          aria-label="City"
        />
        <span className="input-group-btn">
          <button className="btn btn-default" type="submit" disabled={!this.state.term.trim()}>
            Submit
          </button>
        </span>
      </form>
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
