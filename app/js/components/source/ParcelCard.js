import React from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import { Dropdown, DropdownMenu, DropdownItem, Progress, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

import { pickPackage, clearPickPackage, updatePackageAsync, verifyParcelForCardSwipe, clearCardSwipeLogs } from '../../actions/packages';

function mapStateToProps(state) {
  return {
    packages: state.packages.items,
    pickedPackage: state.packages.pickedPackage,
    cardSwipe: state.cardSwipe,
  };
}

function dispatchActionToProps(dispatch) {
  return {
    pickPackage: bindActionCreators(pickPackage, dispatch),
    clearPickPackage: bindActionCreators(clearPickPackage, dispatch),
    updatePackageAsync: bindActionCreators(updatePackageAsync, dispatch),
    verifyParcelForCardSwipe: bindActionCreators(verifyParcelForCardSwipe, dispatch),
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
      this.props.updatePackageAsync(this.props.pickedPackage.objectId, this.props.pickedPackage.owner.objectId)

      setTimeout(this.closeModal, 500)
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
    let object=this;
    clearCardSwipeLogs().then(function (success) {
      object.setState({
        modal: !object.state.modal
      }).catch(function (error) {
        console.error("Oops! Something went wrong: " + error.message + " (" + error.code + ")");
      });
    });
    this.props.pickPackage(pkg);
  }

  viewParcel() {
    let pickupDate;
    return this.props.packages.map((parcel) => {
      const parcelStatus = (parcel.pickupDate)
        ? (<div><i>Picked by {parcel.pickedBy.name} <Moment fromNow>{parcel.pickupDate.iso}</Moment>  </i></div>)
        : (<button className="btn btn-primary" onClick={() => this.pickPackage(parcel)}><strong>Pick </strong></button>);

      return (
        <tr key={parcel.objectId} className={(parcel.pickupDate) ? "text-muted" : ""}>
          <td className="text-center">
            <div className="avatar">
              <img src={'img/avatars/1.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
              <span className="avatar-status badge-success" />
            </div>
          </td>
          <td>
            <div>{parcel.owner.name}</div>
          </td>
          <td cassName="text-center">
            <img src={parcel.vendor.icon} alt={parcel.vendor.name} className="vendor-icon" />
          </td>
          <td>
            <Moment fromNow>{parcel.createdAt}</Moment>
            <div className="small text-muted">
              <Moment format="DD MMM YY hh:mm A">{parcel.createdAt}</Moment>
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
    if (this.state.modal && (this.props.cardSwipe.cardSwipeStatus == '' || this.props.cardSwipe.cardSwipeStatus == 'Invalid')) {
      this.props.verifyParcelForCardSwipe(this.props.pickedPackage.objectId);
    }

    let cardSwipeStatus = this.props.cardSwipe.cardSwipeStatus == 'Invalid' ? 'Card is not linked to your profile. Please contact Admin.': '';

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
            {this.viewParcel()}
          </tbody>
        </table>

        <Modal className="custom-modal" isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Swipe your card or Enter passcode</ModalHeader>
          <ModalBody>
            <div className="container">
              <div className="row">
                <div className="col-md-4">
                  <img id="card-reader-image" src={'img/card_reader.png'} alt="card reader image" />
                  <span> {cardSwipeStatus} </span>
                </div>
                <div className="vertical-line"></div>
                <div className={`col-md-7 form-group has-${this.state.pickedParcelVerifyStatus}`}>
                  <div className="input-group">
                    <span className="input-group-addon">PassCode</span>
                    <input type="text" id="parcel-code" name="parcel-code" className={`form-control form-control-${this.state.pickedParcelVerifyStatus}`} onChange={this.changeParcelPassCode} value={this.state.parcelPassCode} />
                    <span className="input-group-addon"><i className="fa fa-envelope" /></span>
                  </div>
                  <div className="form-control-feedback">{this.state.pickedParcelVerifyStatusHelpText}</div>
                  <Button color="primary" onClick={this.verifyPackage}>Verify Parcel</Button>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.closeModal}>Close Modal</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

ParcelCard.propTypes = {
  packages: PropTypes.array,
  cardSwipe: PropTypes.object,
};

export default connect(mapStateToProps, dispatchActionToProps)(ParcelCard);
