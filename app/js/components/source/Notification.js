import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as notification from '../../actions/notification';

function dispatchActionToProps(dispatch) {
  return {
    notificationAction: bindActionCreators(notification, dispatch),
  };
}

function mapStateToProps(state) {
  return {
    notificationContent: state.notification.notificationContent,
    notificationClass: state.notification.notificationClass,
  };
}

class Notification extends Component {
  constructor() {
    super();
    this.onCloseNotification = this.onCloseNotification.bind(this);
    this.getNotificationContent = this.getNotificationContent.bind(this);
  }

  getNotificationContent() {
    return {
      __html: this.props.notificationContent
    }
  }

  onCloseNotification() {
    this.props.notificationAction.hideNotification();
  }

  render() {
    let notificationClass;
    if (this.props.notificationContent !== '') {
      notificationClass = `notification open ${this.props.notificationClass}`;
    } else {
      notificationClass = "notification";
    }
    return (
      <div className={notificationClass}>
        <div className="notification-content" dangerouslySetInnerHTML={this.getNotificationContent()} />
        <i className="fa fa-times" onClick={this.onCloseNotification} />
      </div>
    );
  }
}

export default connect(mapStateToProps, dispatchActionToProps)(Notification);
