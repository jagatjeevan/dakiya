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

class ListParcel extends Component {

  componentDidMount() {
    this.props.fetchPackages();
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
        </div>
      </div>
    );
  }
}

ListParcel.propTypes = {
  packages: PropTypes.arrayOf(PropTypes.object),
  dispatch: PropTypes.func,
  fetchPackages: PropTypes.func,
};

function dispatchActionToProps(dispatch) {
  return {
    fetchPackages: () => dispatch(fetchPackages()),
  }
}

function mapStateToProps(state) {
  return {
    packages: Object.keys(state.packages.items).map(objectId => state.packages.items[objectId]),
  };
}

export default connect(mapStateToProps, dispatchActionToProps)(ListParcel);
