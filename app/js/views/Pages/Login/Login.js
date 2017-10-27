import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { login } from '../../../actions/auth';

function dispatchActionToProps(dispatch) {
  return {
    login: bindActionCreators(login, dispatch),
  };
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    if (e.target.name === 'username') {
      this.setState({ username: e.target.value });
    } else if (e.target.name === 'password') {
      this.setState({ password: e.target.value });
    }
  }

  handleLogin(event) {
    event.preventDefault();
    this.props.login(this.state);
  }

  render() {
    const { from } = { from: { pathname: '/parcels' } }
    if (this.props.auth.isLoggedIn) {
      return (
        <Redirect to={from} />
      )
    }

    return (
      <div className="app flex-row align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card-group mb-0">
                <div className="card p-4">
                  <form onSubmit={this.handleLogin}>
                    <div className="card-block">
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <div className="input-group mb-3">
                        <span className="input-group-addon"><i className="icon-user" /></span>
                        <input type="text" className="form-control" placeholder="Username" name="username" value={this.state.username} onChange={this.handleChange} />
                      </div>
                      <div className="input-group mb-4">
                        <span className="input-group-addon"><i className="icon-lock" /></span>
                        <input type="password" className="form-control" placeholder="Password" value={this.state.password} name="password" onChange={this.handleChange} />
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <button type="submit" className="btn btn-primary px-4">Login</button>
                        </div>
                        <div className="col-6 text-right">
                          <button type="button" className="btn btn-link px-0">Forgot password?</button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="card card-inverse card-primary py-5 d-md-down-none" style={{ width: `${44}%` }}>
                  <div className="card-block text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                      <button type="button" className="btn btn-primary active mt-3">Register Now!</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, dispatchActionToProps)(Login);
