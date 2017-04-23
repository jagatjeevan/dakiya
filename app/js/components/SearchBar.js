import React from 'react';
import axios from 'axios';
import urls from '../urls';

export default class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = {
      searchName: '',
      error: false,
      errorMsg: ''
    };
    this.updateSearchInput = this.updateSearchInput.bind(this);
    this.initiateSearch = this.initiateSearch.bind(this);
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
  }

  setError(err, msg='') {
    this.setState({
      error: err,
      errorMsg: msg
    });
  }

  initiateSearch() {
    if(this.state.searchName.split('').length > 3) {
      this.setError(false);
      const url = urls.search + this.state.searchName;
      axios.get(url)
        .then((res) => {
          console.log('response', res);
        });
      return;
    }
    this.setError(true, 'Please enter more than 3 characters');
  }

  render() {
    return(
      <div className='search-bar'>
        <div className='search-component'>
          <input type='text' value={ this.state.searchName } placeholder='Type in to search ...' onChange={this.updateSearchInput} />
          <button onClick={this.initiateSearch}>
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
