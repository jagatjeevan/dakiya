import React from 'react';
import { Link } from 'react-router';
import appConfig from '../appConfig';

export default class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      isNavBarOpen: false,
    };
    this.toggleNavbar = this.toggleNavbar.bind(this);
  }
  toggleNavbar() {
    this.setState({
      isNavBarOpen: !this.state.isNavBarOpen,
    });
  }
  render() {
    const navbarClassName = (this.state.isNavBarOpen) ? 'opened' : 'closed';
    const iconMenuClass = (this.state.isNavBarOpen) ? 'menu-switch icon-cancel' : 'menu-switch icon-menu';
    return (
      <header id="header">
        <div className="logo-container">
          <img src={`${appConfig.imagePath}/logo.png`} alt="Dakiya" />
          <i className={iconMenuClass} onClick={this.toggleNavbar} />
          <div className="menu-links">
            <Link to={appConfig.homePage} activeClassName="active">List Parcels</Link>
            <Link to={appConfig.addParcelPage} activeClassName="active">Add Parcel</Link>
          </div>
        </div>
        <nav className={navbarClassName}>
          <ul>
            <li key="home">
              <Link to={appConfig.homePage} activeClassName="active">List Parcels</Link>
            </li>
            <li key="about">
              <Link to={appConfig.addParcelPage} activeClassName="active">Add Parcel</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}
