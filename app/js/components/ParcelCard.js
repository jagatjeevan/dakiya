import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import urls from '../urls';

function mapStateToProps(state) {
  return {
    openParcels: state.openParcels,
  };
}

export class ParcelCard extends React.Component {
  constructor() {
    super();
    this.viewParcels = this.viewParcels.bind(this);
  }

  viewParcels() {
    return this.props.openParcels.map((parcel) => {
      return (
        <div className='name-card' key={parcel.id}>
          <div className='status'>
            <i></i>
          </div>
          <div className='reciever-detail'>
            <div className='profile-image'>
              <img src={`${urls.imagePath}/logo.png`} width='70' height='70' className='img-circle' />
            </div>
            <div className='name-and-phone-number'>
              <span><b>{ parcel.owner.name }</b></span>
              <span>{ parcel.owner.phone_no }</span>
            </div>
          </div>
          <div className='sender-detail'>
            <span>Packet No.: </span> <b>{parcel.id}</b>
          </div>
          <div className='sender-detail'>
            <span>Date dispatched: </span> <b>{parcel.received_date}</b>
          </div>
          <div className='sender-detail'>
            <span>Date recieved: </span> <b>Not Recieved</b>
          </div>
          <div className='sender-detail'>
            <span>Name: </span> <b>{parcel.dealer.name}</b>
          </div>
        </div>
      );
    });
  }

  render() {
    return(
      <div className="parcel-card-container">
        { this.viewParcels() }
      </div>
    );
  }
}

export default connect(mapStateToProps)(ParcelCard);
