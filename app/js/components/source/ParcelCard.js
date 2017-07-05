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
      const parcelStatus = (parcel.pickupDate) ? "yet-to-deliver" : "delivered";
      if (parcel.pickupDate) {
        pickupDate = parcel.pickupDate.iso;
      } else {
        pickupDate = 'Not yet picked up';
      }
      const statusIcon = (parcel.pickupDate) ? "status-icon fa fa-check" : "status-icon fa fa-hourglass-start";
      return (
        <tr key={parcel.objectId} className={parcelStatus}>
          <td className="icon-container"> <i className={statusIcon} /> </td>
          <td> {parcel.packageId} </td>
          <td>
            <div>{ parcel.owner.name }</div>
            <span className="small text-muted">{ parcel.owner.phoneNumber }</span>
          </td>
          <td> {parcel.createdAt} </td>
          <td> {pickupDate} </td>
          <td> <img src={parcel.vendor.icon} alt={parcel.vendor.name} className="vendor-icon" /> </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="card">
        <div className="parcel-card-container">
          <table className="table table-hover">
            <thead className="thead-default">
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
      </div>
    );
  }
}

ParcelCard.propTypes = {
  packages: PropTypes.array,
};

export default connect(mapStateToProps)(ParcelCard);
