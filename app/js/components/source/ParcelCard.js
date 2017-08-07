import React from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import { Dropdown, DropdownMenu, DropdownItem, Progress, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

import { pickPackage, clearPickPackage, updatePackageAsync } from '../../actions/packages';

function mapStateToProps(state) {
  return {
    packages: state.packages.items,
    pickedPackage: state.packages.pickedPackage,
  };
}

function dispatchActionToProps(dispatch) {
  return {
    pickPackage: bindActionCreators(pickPackage, dispatch),
    clearPickPackage: bindActionCreators(clearPickPackage, dispatch),
    updatePackageAsync: bindActionCreators(updatePackageAsync, dispatch),
  };
}

const initialState = {
  modal: false,
  parcelPassCode: '',
  pickedParcelVerifyStatus: '',
  pickedParcelVerifyStatusHelpText: ''
};

export class ParcelCard extends React.Component {
  constructor() {
    super();
    this.state = initialState;

    this.viewParcel = this.viewParcel.bind(this);
    this.viewParcels = this.viewParcels.bind(this);
    this.pickPackage = this.pickPackage.bind(this);
    this.verifyPackage = this.verifyPackage.bind(this);
    this.changeParcelPassCode = this.changeParcelPassCode.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  changeParcelPassCode(e) {
    this.setState({ parcelPassCode: e.target.value });
  }

  resetState() {
    this.setState(initialState);
  }

  closeModal() {
    this.resetState();
  }

  verifyPackage() {
    if (this.state.parcelPassCode !== "" && (this.props.pickedPackage.objectId === this.state.parcelPassCode)) {
      this.setState({
        pickedParcelVerifyStatus: 'success',
        pickedParcelVerifyStatusHelpText: '',
      });
      //TODO: Create an action to send the response.
      this.props.updatePackageAsync(this.props.pickedPackage.objectId)
    } else {
      this.setState({
        pickedParcelVerifyStatus: 'danger',
        pickedParcelVerifyStatusHelpText: 'Please enter the passcode sent to your email',
      });
    }
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

  pickPackage(pkg) {
    this.setState({
      modal: !this.state.modal
    });

    this.props.pickPackage(pkg);
  }

  viewParcel() {
    let pickupDate;
    return this.props.packages.map((parcel) => {
      const parcelStatus = (parcel.pickupDate) 
        ? (<div><i>Picked <Moment fromNow>{parcel.pickupDate.iso}</Moment> </i></div>)
        : (<button className="btn btn-primary" onClick={() => this.pickPackage(parcel)}>Pick parcel</button>);

      return (
        <tr key={parcel.objectId} className={(parcel.pickupDate)?"text-muted":""}>
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
          <td> 
          <Moment fromNow>{parcel.createdAt}</Moment>
          <div className="small text-muted">
              <Moment format="DD MMM 'YY hh:mm A">{parcel.createdAt}</Moment>
            </div>
          </td>
          <td> <strong className="h5">{parcel.packageId}</strong>  </td>
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
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Verify your Parcel</ModalHeader>
          <ModalBody>
            <div className={`form-group has-${this.state.pickedParcelVerifyStatus}`}>
              <div className="input-group">
                <span className="input-group-addon">PassCode</span>
                <input type="text" id="parcel-code" name="parcel-code" className={`form-control form-control-${this.state.pickedParcelVerifyStatus}`} onChange={this.changeParcelPassCode} value={this.state.parcelPassCode} />
                <span className="input-group-addon"><i className="fa fa-envelope" /></span>
              </div>
              <div className="form-control-feedback">{this.state.pickedParcelVerifyStatusHelpText}</div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.verifyPackage}>Verify Parcel</Button>
            <Button color="danger" onClick={this.closeModal}>Close Modal</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ParcelCard.propTypes = {
  packages: PropTypes.array,
};

export default connect(mapStateToProps, dispatchActionToProps)(ParcelCard);
