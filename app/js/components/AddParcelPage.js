import { Component } from 'react';

import Header from './AppHeader';

export default class AddParcel extends Component {
  render() {
    return(
      <div>
        <Header />
        <div className='add-parcel-container'>
          <header>Add the Parcel below:</header>
          <div className='add-parcel-form'>
            <div className='form-container'>
              <label htmlFor='name'>
                Name
                <input type='text' id='name' placeholder='Name' />
              </label>
            </div>
            <div className='form-container'>
              <label htmlFor='email'>
                Email Address
                <input type='email' id='email' placeholder='mike@gmail.com' />
              </label>
            </div>
            <div className='form-container'>
              <label htmlFor='phone'>
                Phone Number
                <input type='number' id='phone' placeholder='124132758' />
              </label>
            </div>
            <div className='form-container'>
              <label htmlFor='dealer'>
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
