import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { logout } from '../actions/auth';
import { toggleSidebar } from '../actions/sidebar';
import appConfig from '../appConfig';

function dispatchActionToProps(dispatch) {
  return {
    logout: bindActionCreators(logout, dispatch),
    toggleSidebar: bindActionCreators(toggleSidebar, dispatch),
  };
}

function mapStateToProps(state) {
  return {
    sidebar: state.sidebar,
  };
}

export class Header extends React.Component {
  constructor() {
    super();
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  toggleNavbar() {
    this.props.toggleSidebar();
  }

  onLogout() {
    this.props.logout();
  }

  render() {
    const navbarClassName = (this.props.sidebar.isSidebarOpen) ? 'open' : 'close';
    return (
      <div>
        <header className="app-header">
          <span className={`navigation-toggle ${navbarClassName}`}>
            <i className={`icon-dot-3 ${navbarClassName}`} onClick={this.toggleNavbar} />
          </span>
          <div className="logo-image">Dakiya</div>
        </header>
        <nav className={`links-container ${navbarClassName}`}>
          <ul>
            <li key="home">
              <Link to={appConfig.homePage} activeClassName="active">List Parcels</Link>
            </li>
            <li key="about">
              <Link to={appConfig.addParcelPage} activeClassName="active">Add Parcel</Link>
            </li>
            <li className="bottom" onClick={this.onLogout}>
              <a href="/">Logout</a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

Header.propTypes = {
  logout: PropTypes.func,
  toggleSidebar: PropTypes.func,
  sidebar: PropTypes.object,
};

export default connect(mapStateToProps, dispatchActionToProps)(Header);
