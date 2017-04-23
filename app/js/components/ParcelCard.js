import React from 'react';
import urls from '../urls';

export default class ParcelCard extends React.Component {
  render() {
    return(
      <div className='parcel-card-container'>
        <div className='name-card'>
          <div className='status'>
            <i></i>
          </div>
          <div className='reciever-detail'>
            <div className='profile-image'>
              <img src={`${urls.imagePath}/logo.png`} width='70' height='70' className='img-circle' />
            </div>
            <div className='name-and-phone-number'>
              <span><b>Jagat Jeevan Sahoo</b></span>
              <span>+91 - 9740970977</span>
            </div>
          </div>
          <div className='sender-detail'>
            <span>Packet No.: </span> <b>Y1M2E1748</b>
          </div>
          <div className='sender-detail'>
            <span>Date dispatched: </span> <b>Not Dispatched</b>
          </div>
          <div className='sender-detail'>
            <span>Date recieved: </span> <b>10<sup>th</sup> April 2016</b>
          </div>
          <div className='sender-detail'>
            <span>Name: </span> <b>Amazon</b>
          </div>
        </div>
        <div className='name-card'>
          <div className='status'>
            <i className='icon-ok'></i>
          </div>
          <div className='reciever-detail'>
            <div className='profile-image'>
              <img src={`${urls.imagePath}/logo.png`} width='70' height='70' className='img-circle' />
            </div>
            <div className='name-and-phone-number'>
              <span><b>Jagat Jeevan Sahoo</b></span>
              <span>+91 - 9740970977</span>
            </div>
          </div>
          <div className='sender-detail'>
            <span>Packet No.: </span> <b>Y1M2E1748</b>
          </div>
          <div className='sender-detail'>
            <span>Date dispatched: </span> <b>20<sup>th</sup> April 2016</b>
          </div>
          <div className='sender-detail'>
            <span>Date recieved: </span> <b>10<sup>th</sup> April 2016</b>
          </div>
          <div className='sender-detail'>
            <span>Name: </span> <b>Flipkart</b>
          </div>
        </div>
      </div>
    );
  }
}
