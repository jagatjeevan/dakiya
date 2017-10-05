import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Components
import Header from './AppHeader';
import translator from '../../util/i18n';

// actions
import { updateEmployeeData } from '../../actions/seedData';
import { logout } from '../../actions/auth';

function dispatchActionToProps(dispatch) {
  return {
    updateEmployeeData: bindActionCreators(updateEmployeeData, dispatch),
    logout: bindActionCreators(logout, dispatch),
  };
}

function mapStateToProps(state) {
  return {
    sidebar: state.sidebar,
  };
}

class SeedData extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.updateEmployeeData();
  }

  getStatus() {
    let seedStatus = 'Seed data';
    return (
      <div>
        {seedStatus}
      </div>
    );
  }

  render() {
    const isSidebarOpen = (this.props.sidebar.isSidebarOpen) ? 'open' : 'close';
    return (
      <div>
      { this.getStatus() }
      </div>
    );
  }
}

SeedData.propTypes = {
  updateEmployeeData: PropTypes.func,
  sidebar: PropTypes.object,
};

export default connect(mapStateToProps, dispatchActionToProps)(SeedData);
