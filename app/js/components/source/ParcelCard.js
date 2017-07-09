import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Dropdown, DropdownMenu, DropdownItem, Progress, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

function mapStateToProps(state) {
  return {
    packages: state.packages.items,
  };
}

export class ParcelCard extends React.Component {
  constructor() {
    super();
    
    this.state = {
      modal: false
    };

    this.viewParcel = this.viewParcel.bind(this);
    this.viewParcels = this.viewParcels.bind(this);
    this.toggle = this.toggle.bind(this);
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

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  viewParcel() {
    let pickupDate;
    return this.props.packages.map((parcel) => {
      const parcelStatus = (parcel.pickupDate) 
        ? (<div><b>Parcel delivered on</b> {parcel.pickupDate.iso}</div>) 
        : (<button className="btn btn-primary" onClick={this.toggle}>Pick parcel</button>);

      return (
        <tr key={parcel.objectId} className={parcelStatus}>
          <td className="text-center">
            <div className="avatar">
              <img src={'img/avatars/1.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
              <span className="avatar-status badge-success" />
            </div>
          </td>
          <td>
            <div>{ parcel.owner.name }</div>
            <div className="small text-muted">
              { parcel.owner.phoneNumber }
            </div>
          </td>
          <td className="text-center">
            <img src={parcel.vendor.icon} alt={parcel.vendor.name} className="vendor-icon" />
          </td>
          <td> {parcel.createdAt} </td>
          <td> {parcel.packageId} </td>
          <td>
            {parcelStatus}
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className="parcel-card-container">
        <table className="table table-hover table-outline mb-0 hidden-sm-down">
          <thead className="thead-default">
            <tr>
              <th className="text-center"><i className="icon-people" /></th>
              <th>Reciever Details</th>
              <th className="text-center">Vendor</th>
              <th>Recieved Date</th>
              <th>Package Number</th>
              <th className="parcel-status-column">Action</th>
            </tr>
          </thead>
          <tbody>
            { this.viewParcel() }
          </tbody>
        </table>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Verify your Parcel</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon">PassCode</span>
                <input type="text" id="parcel-code" name="parcel-code" className="form-control" />
                <span className="input-group-addon"><i className="fa fa-envelope" /></span>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Verify Parcel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ParcelCard.propTypes = {
  packages: PropTypes.array,
};

export default connect(mapStateToProps)(ParcelCard);
