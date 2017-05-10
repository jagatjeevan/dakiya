import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// actions
import { fetchPackages } from '../actions/packages';

function dispatchActionToProps(dispatch) {
  return {
    fetchPackages: bindActionCreators(fetchPackages, dispatch),
  }
}

function mapStateToProps() {
  return{};
}

export class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = {
      searchName: '',
      error: false,
      errorMsg: ''
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
      searchName: e.target.value
    });
    this.search();
  }

  setError(err, msg='') {
    this.setState({
      error: err,
      errorMsg: msg
    });
  }

  search() {
    if(this.state.searchName.split('').length > 3) {
      this.setError(false);
      this.props.fetchPackages(this.state.searchName);
      return;
    } else {
      this.props.fetchPackages('');
    }
    this.setError(true, 'Please enter more than 3 characters');
  }

  render() {
    return(
      <div className='search-bar'>
        <div className='search-component'>
          <input type='text' value={ this.state.searchName } placeholder='Type in to search ...' onChange={this.updateSearchInput} />
          <button onClick={this.search}>
            <i className='icon-search'></i>
            Search
          </button>
        </div>
        {this.getError()}
        <div className='filters'>
          <div className='filter'>
            <label>
              <input type='checkbox' value='delivered' /> Delivered
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, dispatchActionToProps)(SearchBar);
