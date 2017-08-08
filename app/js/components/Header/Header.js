import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Dropdown, DropdownMenu, DropdownItem } from 'reactstrap';

import Parse from '../../actions/parseConfig';
import { logout } from '../../actions/auth';

function mapStateToProps(state) {
  return {
  };
}

function dispatchActionToProps(dispatch) {
  return {
    logout: bindActionCreators(logout, dispatch),
  };
}

class Header extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      username: "",
      dropdownOpen: false,
    };
  }

  componentWillMount() {
    const user = Parse.User.current();
    if(user){
      this.setState({"username":user.getUsername()}) 
    }
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }

  render() {
    return (
      <header className="app-header navbar">
        <button className="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" onClick={this.mobileSidebarToggle}>&#9776;</button>
        <a className="navbar-brand logo-container" href="#">Dakiya</a>
        <ul className="nav navbar-nav d-md-down-none">
          <li className="nav-item">
            <button className="nav-link navbar-toggler sidebar-toggler" type="button" onClick={this.sidebarToggle}>&#9776;</button>
          </li>
        </ul>
        <ul className="nav navbar-nav ml-auto header-right-spacing">
          <li className="nav-item">
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <button onClick={this.toggle} className="nav-link dropdown-toggle" data-toggle="dropdown" type="button" aria-haspopup="true" aria-expanded={this.state.dropdownOpen}>
                <img src={'https://scontent-sin6-2.xx.fbcdn.net/v/t1.0-1/p320x320/19554467_10156408251533378_8838470583531429260_n.jpg?oh=86c3bff5d27e5fba72d37469a70ddb40&oe=5A0CF294'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                <span className="d-md-down-none">{this.state.username}</span>
              </button>

              <DropdownMenu className="dropdown-menu-right">
                <DropdownItem header className="text-center"><strong>Settings</strong></DropdownItem>
                <DropdownItem>
                <div onClick={() => this.props.logout()}><i className="fa fa-lock" /> Logout </div>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </li>
        </ul>
      </header>
    );
  }
}

export default connect(mapStateToProps, dispatchActionToProps)(Header);
