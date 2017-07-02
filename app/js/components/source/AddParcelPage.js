import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AutoSuggest from 'react-autosuggest';

// Custom Components
import Header from './AppHeader';

// Actions
import { fetchEmployee, selectedEmployee, resetEmployeeList } from '../actions/employees';
import { savePackageAsync } from '../actions/packages';
import { fetchVendors } from '../actions/vendors';

function dispatchActionToProps(dispatch) {
  return {
    fetchEmployees: bindActionCreators(fetchEmployee, dispatch),
    selectEmployee: bindActionCreators(selectedEmployee, dispatch),
    resetEmployeeList: bindActionCreators(resetEmployeeList, dispatch),
    savePackageAsync: bindActionCreators(savePackageAsync, dispatch),
    fetchVendors: bindActionCreators(fetchVendors, dispatch),
  };
}

function mapStateToProps(state) {
  return {
    employees: state.employees.employees,
    selectedEmployee: state.employees.selectedEmployee,
    vendors: state.vendors,
    sidebar: state.sidebar,
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
    const isSidebarOpen = (this.props.sidebar.isSidebarOpen) ? 'open' : 'close';
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Enter name / phone number',
      value,
      onChange: this.onChange,
    };
    return (
      <div>
        <Header />
        <div className={`add-parcel-container body-container ${isSidebarOpen}`}>
          <header>Add the Parcel below:</header>
          <AutoSuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            onSuggestionSelected={this.onSuggestionSelected}
            inputProps={inputProps}
          />
          <form onSubmit={this.handleSubmit}>
            <div className="add-parcel-form">
              <div className="form-container">
                <label htmlFor="email">
                  Email Address
                  <input type="email" id="email" placeholder="mike@gmail.com" value={this.props.selectedEmployee.email} readOnly />
                </label>
              </div>
              <div className="form-container">
                <label htmlFor="phone">
                  Phone Number
                  <input type="number" id="phone" placeholder="124132758" value={this.props.selectedEmployee.phoneNumber} readOnly />
                </label>
              </div>
              <div className="form-container">
                <label htmlFor="awb">
                  AWB Number
                  <input type="text" id="awb" placeholder="124132758" value={this.state.awb} onChange={this.onAwbChange} />
                </label>
              </div>
              <div className="form-container">
                <label htmlFor="dealer">
                  Dealer
                  <select id="vendor" onChange={this.onVendorSelected}>
                    {this.getVendors()}
                  </select>
                </label>
              </div>
            </div>
            <footer>
              <input type="submit" value="Add Parcel" className="button" />
            </footer>
          </form>
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
  fetchVendors: PropTypes.func,
  employees: PropTypes.array,
  vendors: PropTypes.object,
  selectedEmployee: PropTypes.object,
  sidebar: PropTypes.object,
};

export default connect(mapStateToProps, dispatchActionToProps)(AddParcel);
