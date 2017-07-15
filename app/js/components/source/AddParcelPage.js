import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AutoSuggest from 'react-autosuggest';

// Actions
import { fetchEmployee, selectedEmployee, resetEmployeeList } from '../../actions/employees';
import { savePackageAsync } from '../../actions/packages';
import { fetchVendors } from '../../actions/vendors';
import { showNotification, hideNotification } from '../../actions/notification';

function dispatchActionToProps(dispatch) {
  return {
    fetchEmployees: bindActionCreators(fetchEmployee, dispatch),
    selectEmployee: bindActionCreators(selectedEmployee, dispatch),
    resetEmployeeList: bindActionCreators(resetEmployeeList, dispatch),
    savePackageAsync: bindActionCreators(savePackageAsync, dispatch),
    fetchVendors: bindActionCreators(fetchVendors, dispatch),
    showNotification: bindActionCreators(showNotification, dispatch),
    hideNotification: bindActionCreators(hideNotification, dispatch),
  };
}

function mapStateToProps(state) {
  return {
    employees: state.employees.employees,
    selectedEmployee: state.employees.selectedEmployee,
    vendors: state.vendors,
  };
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

function renderSuggestion(suggestion) {
  return `${suggestion.name} ${suggestion.phoneNumber}`;
}

class AddParcel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: this.props.employees,
      awb: '',
      selectedVendorId: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
    this.getSuggestions = this.getSuggestions.bind(this);
    this.searchEmployee = this.searchEmployee.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
    this.updateSelectedEmployee = this.updateSelectedEmployee.bind(this);
    this.onAwbChange = this.onAwbChange.bind(this);
    this.getVendors = this.getVendors.bind(this);
    this.onVendorSelected = this.onVendorSelected.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  componentWillMount() {
    this.props.fetchVendors();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.employees !== nextProps.employees) {
      this.setState({
        suggestions: nextProps.employees,
      });
    }
  }

  resetForm() {
    this.setState({
      value: '',
      awb: '',
      selectedVendorId: '',
    });
  }

  getVendors() {
    if (!this.props.vendors.isFetching && this.props.vendors.items.length) {
      return this.props.vendors.items.map(vendor => (<option value={vendor.objectId} key={vendor.objectId}>{vendor.name}</option>));
    }
    return (<option value="">No Vendors available</option>);
  }

  onVendorSelected(event) {
    this.setState({
      selectedVendorId: event.target.value,
    });
  }

  onAwbChange(e) {
    this.setState({
      awb: e.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.props.selectedEmployee.objectId) {
      if (this.state.awb !== '') {
        this.props.savePackageAsync(this.props.selectedEmployee.objectId, this.state.selectedVendorId, this.state.awb);
      } else {
        alert("put awb number");
      }
      // TODO: JAGAT: give a notification to user about "AWB number" being empty.
      return;
    }
    // TODO: JAGAT: give a notification to user about Selecting employee for the package.
    alert('Please select the employee');
  }

  onChange(event, { newValue }) {
    this.setState({
      value: newValue,
    });
  }

  onSuggestionsClearRequested() {
    this.setState({
      suggestions: [],
    });
  }

  getSuggestions(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : this.props.employees.filter(employee =>
      employee.name.toLowerCase().slice(0, inputLength) === inputValue,
    );
  }

  onSuggestionSelected(event, { suggestion }) {
    this.props.selectEmployee(suggestion);
  }

  onSuggestionsFetchRequested({ value }) {
    this.setState({
      suggestions: this.getSuggestions(value),
    });
    this.searchEmployee(value);
  }

  searchEmployee(value) {
    if (value.length > 3) {
      this.props.fetchEmployees(value);
    } else {
      this.props.resetEmployeeList();
    }
  }

  updateSelectedEmployee(selectedEmp) {
    this.props.selectEmployee(selectedEmp);
  }

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Enter name to start searching employee',
      value,
      onChange: this.onChange,
      className: 'form-control',
    };
    return (
      <div className="row add-parcel-form">
        <div className="col-lg-8 offset-lg-2">
          <div className="card">
            <div className="card-header">
              Add the Parcel below:
            </div>
            <div className="card-block">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <AutoSuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    onSuggestionSelected={this.onSuggestionSelected}
                    inputProps={inputProps}
                  />
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <div className="input-group">
                        <span className="input-group-addon">Name / Phone Number</span>
                        <input type="text" id="name-phone" name="name-phone" className="form-control" placeholder="Mike" value={this.props.selectedEmployee.name} readOnly />
                        <span className="input-group-addon"><i className="fa fa-asterisk" /></span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <div className="input-group">
                        <span className="input-group-addon">Email Address</span>
                        <input type="email" id="email" name="email" className="form-control" placeholder="mike@gmail.com" value={this.props.selectedEmployee.email} readOnly />
                        <span className="input-group-addon"><i className="fa fa-envelope" /></span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <div className="input-group">
                        <span className="input-group-addon">Phone Number</span>
                        <input type="text" id="phone" name="phone" className="form-control" placeholder="0987654321" value={this.props.selectedEmployee.phoneNumber} readOnly />
                        <span className="input-group-addon"><i className="fa fa-phone" /></span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <select id="vendor" className="form-control" onChange={this.onVendorSelected}>
                        {this.getVendors()}
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <div className="input-group">
                        <span className="input-group-addon">AWB Number</span>
                        <input type="text" id="awb" name="awb" className="form-control" value={this.state.awb} onChange={this.onAwbChange} />
                        <span className="input-group-addon"><i className="fa fa-barcode" /></span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-actions pull-right">
                      <input type="submit" value="Add Parcel" className="btn btn-primary" />
                      <input type="reset" value="Clear All" className="btn btn-secondary" onClick={this.resetForm} />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddParcel.propTypes = {
  fetchEmployees: PropTypes.func,
  selectEmployee: PropTypes.func,
  resetEmployeeList: PropTypes.func,
  savePackageAsync: PropTypes.func,
  showNotification: PropTypes.func,
  hideNotification: PropTypes.func,
  fetchVendors: PropTypes.func,
  employees: PropTypes.array,
  vendors: PropTypes.object,
  selectedEmployee: PropTypes.object,
};

export default connect(mapStateToProps, dispatchActionToProps)(AddParcel);
