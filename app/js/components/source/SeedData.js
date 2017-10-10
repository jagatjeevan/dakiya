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
    seedData: state.seedData,
    sidebar: state.sidebar,
  };
}

class SeedData extends Component {
  constructor(props) {
    super(props);
    this.getStatus = this.getStatus.bind(this);
  }

  componentDidMount() {
    this.props.updateEmployeeData();
  }

  getStatus() {
    let status = "";
    if (this.props.seedData.isFetching) {
      status = 'Fetching page ' + this.props.seedData.pageNumber;
    }
    else {
      status = 'All pages are loaded';
    }
    return status;
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
  seedData: PropTypes.object,
  updateEmployeeData: PropTypes.func,
  sidebar: PropTypes.object,
};

export default connect(mapStateToProps, dispatchActionToProps)(SeedData);
