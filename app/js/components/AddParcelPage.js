/* eslint react/prefer-stateless-function: 0 */
import React, { Component } from 'react';
import Parse from 'parse';
import Constants from '../appConfig';
import Header from './AppHeader';

// const qp = { useMasterKey: true };
// const mapper = o => o.toJSON();

Parse.initialize(Constants.XParseApplicationId);
Parse.masterKey = Constants.XParseMasterKey;
Parse.serverURL = Constants.ApiBaseURL;

export default class AddParcel extends Component {
  // constructor() {
  //   super();
  //   // this.fetchEmployee = this.fetchEmployee.bind(this);
  // }

  // fetchEmployee(e) {
  //   if (e.target.value.length > 3) {
  //     const Employee = Parse.Object.extend('Employee');
  //     const query = new Parse.Query(Employee);
  //     query.get('')
  //
  //   }
  // }

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
                <input type="text" id="name" placeholder="Name" onChange={this.fetchEmployee} />
              </label>
            </div>
            <div className="form-container">
              <label htmlFor="email">
                Email Address
                <input type="email" id="email" placeholder="mike@gmail.com" />
              </label>
            </div>
            <div className="form-container">
              <label htmlFor="phone">
                Phone Number
                <input type="number" id="phone" placeholder="124132758" />
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
