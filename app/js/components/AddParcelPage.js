import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Custom Components
import Header from './AppHeader';

// Actions
import { fetchEmployee, selectedEmployee } from '../actions/employees';

function dispatchActionToProps(dispatch) {
  return {
    fetchEmployees: bindActionCreators(fetchEmployee, dispatch),
    selectEmployee: bindActionCreators(selectedEmployee, dispatch),
  };
}

function mapStateToProps(state) {
  return {
    employees: state.employees.employees,
    selectedEmployee: state.employees.selectedEmployee,
  };
}

class AddParcel extends Component {
  constructor() {
    super();
    this.searchEmployee = this.searchEmployee.bind(this);
    this.showSuggesstions = this.showSuggesstions.bind(this);
    this.updateSelectedEmployee = this.updateSelectedEmployee.bind(this);
  }

  searchEmployee(e) {
    if (e.target.value.length > 3) {
      this.props.fetchEmployees(e.target.value);
    } else {
      this.props.fetchEmployees('');
    }
  }

  updateSelectedEmployee(selectedEmp) {
    this.props.selectEmployee(selectedEmp);
  }

  showSuggesstions() {
    return this.props.employees.map(employee => (
      <div key={employee.employeeId} onClick={() => this.updateSelectedEmployee(employee)}>
        <b>{employee.name}</b> - {employee.phoneNumber}
      </div>
      ));
  }

  render() {
    return (
      <div>
        <Header />
        <div className="add-parcel-container">
          <header>Add the Parcel below:</header>
          <div className="add-parcel-form">
            <div className="form-container">
              <label htmlFor="name">
                Name
                <input type="text" id="name" placeholder="Name" onChange={this.searchEmployee} />
                <div>
                  {this.showSuggesstions()}
                </div>
              </label>
            </div>
            <div className="form-container">
              <label htmlFor="email">
                Email Address
                <input type="email" id="email" placeholder="mike@gmail.com" value={this.props.selectedEmployee.email} />
              </label>
            </div>
            <div className="form-container">
              <label htmlFor="phone">
                Phone Number
                <input type="number" id="phone" placeholder="124132758" value={this.props.selectedEmployee.phoneNumber} />
              </label>
            </div>
            <div className="form-container">
              <label htmlFor="dealer">
                Dealer
                <select id="dealer">
                  <option>Amazon</option>
                  <option>Flipkart</option>
                  <option>Ebay</option>
                  <option>Snapdeal</option>
                  <option>Shopclues</option>
                </select>
              </label>
            </div>
          </div>
          <footer>
            <button>Add Parcel</button>
          </footer>
        </div>
      </div>
    );
  }
}

AddParcel.propTypes = {
  fetchEmployees: PropTypes.func,
  selectEmployee: PropTypes.func,
  employees: PropTypes.array,
  selectedEmployee: PropTypes.object,
};

export default connect(mapStateToProps, dispatchActionToProps)(AddParcel);
