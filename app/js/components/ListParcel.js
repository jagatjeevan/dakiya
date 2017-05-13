import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Components
import Header from './AppHeader';
import SearchBar from './SearchBar';
import ParcelCard from './ParcelCard';
import translator from '../util/i18n';

// actions
import { fetchPackages } from '../actions/packages';
import { logout } from '../actions/auth';

function dispatchActionToProps(dispatch) {
  return {
    fetchPackages: bindActionCreators(fetchPackages, dispatch),
    logout: bindActionCreators(logout, dispatch),
  };
}

function mapStateToProps(state) {
  return {
    packages: state.packages,
  };
}

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
    let parcelCardStatus;
    if (this.props.packages.isFetching) {
      parcelCardStatus = 'Loading...';
    } else if (this.props.packages.items.length > 0) {
      parcelCardStatus = <ParcelCard />;
    } else {
      parcelCardStatus = 'No parcels available';
    }
    return (
      <div>
        {parcelCardStatus}
      </div>
    );
  }

  render() {
    return (
      <div>
        <Header />
        <SearchBar />
        <div className="add-parcel-container">
          <h2>{translator.translate('app.openParcelHeading')}</h2>
          { this.getParcels() }
          <button
            onClick={this.onLogout}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }
}

ListParcel.propTypes = {
  packages: PropTypes.object,
  fetchPackages: PropTypes.object,
  logout: PropTypes.func,
};

export default connect(mapStateToProps, dispatchActionToProps)(ListParcel);
