import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function mapStateToProps(state) {
  return {
    packages: state.packages.items,
  };
}

export class ParcelCard extends React.Component {
  constructor() {
    super();
    this.viewParcel = this.viewParcel.bind(this);
    this.viewParcels = this.viewParcels.bind(this);
  }

  viewParcels() {
    return this.props.packages.map(parcel => (
      <div className="name-card" key={parcel.objectId}>
        <div className="reciever-detail" />
        <div className="sender-detail">
          <span>Packet No.: </span> <b>{parcel.packageId}</b>
        </div>
        <div className="sender-detail" />
        <div className="sender-detail">
          <span>Date recieved: </span> <b>Not Recieved</b>
        </div>
        <div className="sender-detail">
          <span>Name: </span> <b>{parcel.vendor.name}</b>
        </div>
      </div>
      ));
  }

  viewParcel() {
    let pickupDate;
    return this.props.packages.map((parcel) => {
      if (parcel.pickupDate) {
        pickupDate = parcel.pickupDate.iso;
      } else {
        pickupDate = 'Not yet picked up';
      }
      return (
        <tr key={parcel.objectId}>
          <td> <i className="status-icon" /> </td>
          <td> {parcel.packageId} </td>
          <td>
            <div>{ parcel.owner.name }</div>
            { parcel.owner.phoneNumber }
          </td>
          <td> {parcel.createdAt} </td>
          <td> {pickupDate} </td>
          <td> {parcel.vendor.name} </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="parcel-card-container">
        <table className="table">
          <thead>
            <tr>
              <th>Status</th>
              <th>Package Number</th>
              <th>Reciever Details</th>
              <th>Date of Recieved</th>
              <th>Pickup Date</th>
              <th>Sender</th>
            </tr>
          </thead>
          <tbody>
            { this.viewParcel() }
          </tbody>
        </table>
      </div>
    );
  }
}

ParcelCard.propTypes = {
  packages: PropTypes.array,
};

export default connect(mapStateToProps)(ParcelCard);
