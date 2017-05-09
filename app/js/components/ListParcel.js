import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Components
import Header from './AppHeader';
import SearchBar from './SearchBar';
import ParcelCard from './ParcelCard';
import translator from '../util/i18n.js';

// actions
import { fetchPackages } from '../actions/packages';
import { logout } from '../actions/auth';

class ListParcel extends Component {

  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
  }

  componentDidMount() {
    this.props.fetchPackages();
  }

  onLogout() {
    this.props.logout();
  }

  getParcels() {
    const { packages } = this.props;
    if (packages.length > 0) {
      return (
        <div className="add-parcel-container">
          <p>{translator.translate('app.allParcelDelivered')}</p>
          <ParcelCard />
        </div>
      );
    }
    return null;
  }

  render() {
    const { packages } = this.props;
    return (
      <div>
        <Header />
        <SearchBar />
        <div className="add-parcel-container">
          <h2>{translator.translate('app.openParcelHeading')}</h2>
          <ParcelCard />
          <button
            onClick={this.onLogout}>
            Logout
          </button>
        </div>
      </div>
    );
  }
}

ListParcel.propTypes = {
  packages: PropTypes.arrayOf(PropTypes.object),
  dispatch: PropTypes.func,
  fetchPackages: PropTypes.func,
  logout: PropTypes.func,
};

function dispatchActionToProps(dispatch) {
  return {
    fetchPackages: () => dispatch(fetchPackages()),
    logout: () => dispatch(logout()),
  }
}

function mapStateToProps(state) {
  return {
    packages: Object.keys(state.packages.items).map(objectId => state.packages.items[objectId]),
  };
}

export default connect(mapStateToProps, dispatchActionToProps)(ListParcel);
