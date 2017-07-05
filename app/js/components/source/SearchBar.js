import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

// actions
import { fetchPackages } from '../../actions/packages';

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
    } else {
      this.setError(true, 'Please enter more than 3 characters');
    }
  }

  render() {
    return (
      <form className="form-horizontal">
        <div className="form-group row">
          <div className="col-md-12">
            <div className="input-group">
              <div className="input-group-btn">
                <ButtonDropdown isOpen={this.state.first} toggle={() => { this.setState({ first: !this.state.first }); }}>
                  <DropdownToggle caret color="primary">All</DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>Un Delivered</DropdownItem>
                    <DropdownItem>Delivered</DropdownItem>
                    <DropdownItem>All</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </div>
              <input type="text" id="input1-group3" name="input1-group3" className="form-control" placeholder="Type in to search your parcel" onChange={this.updateSearchInput} value={this.state.searchName} />
              <span className="input-group-addon" onClick={this.search}><i className="fa fa-search" /></span>
            </div>
          </div>
          {this.getError()}
        </div>
      </form>
    );
  }
}

SearchBar.propTypes = {
  fetchPackages: PropTypes.func,
};

export default connect(mapStateToProps, dispatchActionToProps)(SearchBar);
