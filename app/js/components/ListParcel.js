import React from 'react';
import ReactDOM from 'react-dom';

import Header from './Header';
import SearchBar from './SearchBar';
import ParcelCard from './ParcelCard';

export default class ListParcel extends React.Component {
  render() {
    return(
      <div>
        <Header />
        <SearchBar />
        <ParcelCard />
      </div>
    );
  }
}
