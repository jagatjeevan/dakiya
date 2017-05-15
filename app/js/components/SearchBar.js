import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// actions
import { fetchPackages } from '../actions/packages';

function dispatchActionToProps(dispatch) {
  return {
    fetchPackages: bindActionCreators(fetchPackages, dispatch),
  };
}

function mapStateToProps() {
  return {};
}

export class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = {
      searchName: '',
      error: false,
      errorMsg: '',
      timeoutToken: null,
    };
    this.updateSearchInput = this.updateSearchInput.bind(this);
    this.search = this.search.bind(this);
    this.getError = this.getError.bind(this);
    this.setError = this.setError.bind(this);
  }

  getError() {
    return (this.state.error) ? <div className="error-text">{this.state.errorMsg}</div> : null;
  }

  updateSearchInput(e) {
    this.setState({
      searchName: e.target.value,
    });

    clearTimeout(this.state.timeoutToken);
    const token = setTimeout(this.search, 500);
    this.setState({
      timeoutToken: token,
    });
  }

  setError(err, msg = '') {
    this.setState({
      error: err,
      errorMsg: msg,
    });
  }

  search() {
    const term = this.state.searchName;
    const shouldFetch = term.length === 0 || term.length >= 3;
    this.setError(shouldFetch);
    if (shouldFetch) {
      this.props.fetchPackages(this.state.searchName);
    }
    else {
      this.setError(true, 'Please enter more than 3 characters');
    }
  }

  render() {
    return (
      <div className="search-bar">
        <div className="search-component">
          <input type="text" value={this.state.searchName} placeholder="Type in to search ..." onChange={this.updateSearchInput} />
          <button onClick={this.search}>
            <i className="icon-search" />
            Search
          </button>
        </div>
        {this.getError()}
        <div className="filters">
          <div className="filter">
            <label>
              <input type="checkbox" value="delivered" /> Delivered
            </label>
          </div>
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  fetchPackages: PropTypes.func,
};

export default connect(mapStateToProps, dispatchActionToProps)(SearchBar);
