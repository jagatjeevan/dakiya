import React from 'react';
import { Link } from 'react-router';
import AppPaths from '../appConfig.js';

export default class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      isNavBarOpen: false
    };
    this.toggleNavbar = this.toggleNavbar.bind(this);
  }
  toggleNavbar() {
    this.setState({
      isNavBarOpen: !this.state.isNavBarOpen
    });
  }
  render() {
    const navbarClassName = (this.state.isNavBarOpen) ? 'opened' : 'closed';
    const iconMenuClass = (this.state.isNavBarOpen) ? 'menu-switch icon-cancel' : 'menu-switch icon-menu';
    return (
      <header id='header'>
        <div className='logo-container'>
          <img src={`${AppPaths.imagePath}/logo.png`} />
          <i className={iconMenuClass} onClick={this.toggleNavbar}></i>
          <div className='menu-links'>
            <Link to={AppPaths.homePage} activeClassName='active'>List Parcels</Link>
            <Link to={AppPaths.addParcelPage} activeClassName='active'>Add Parcel</Link>
          </div>
        </div>
        <nav className={navbarClassName}>
          <ul>
            <li key='home'>
              <Link to={AppPaths.homePage} activeClassName='active'>List Parcels</Link>
            </li>
            <li key='about'>
              <Link to={AppPaths.addParcelPage} activeClassName='active'>Add Parcel</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}
