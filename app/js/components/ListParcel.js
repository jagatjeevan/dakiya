import React from 'react';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Components
import Header from './Header';
import SearchBar from './SearchBar';
import ParcelCard from './ParcelCard';

import urls from '../urls';
import translator from '../util/i18n.js';

// actions
import * as openParcels from '../actions/updateOpenParcels';
import * as closedParcels from '../actions/updateClosedParcels';

function dispatchActionToProps(dispatch){
  return {
    openParcelActions: bindActionCreators(openParcels, dispatch),
    closeParcelActions: bindActionCreators(closedParcels, dispatch),
  }
}

function mapStateToProps(state) {
  return {
    openParcels: state.openParcels,
    closedParcels: state.closedParcels
  };
}

export class ListParcel extends React.Component {
  constructor() {
    super();
    this.getParcels = this.getParcels.bind(this);
  }

  componentWillMount() {
    axios
      .get(urls.openParcels)
      .then((parcels) => { this.props.openParcelActions.updateOpenParcels(parcels.data) });

    axios
      .get(urls.closedParcels)
      .then((parcels) => { this.props.closeParcelActions.updateClosedParcels(parcels.data) });
  }

  getParcels() {
    if(this.props.openParcels.length) {
      return (
        <div className="add-parcel-container">
          <h2>{translator.translate('app.openParcelHeading')}</h2>
          <ParcelCard data={this.props.openParcels}/>
        </div>
      );
    } else {
      return (
        <div className="add-parcel-container">
          <h2>{translator.translate('app.openParcelHeading')}</h2>
          <p>{translator.translate('app.allParcelDelivered')}</p>
        </div>
      );
    }
  }

  render() {
    return(
      <div>
        <Header />
        <SearchBar />
        {this.getParcels()}
      </div>
    );
  }
}

export default connect(mapStateToProps ,dispatchActionToProps)(ListParcel);
