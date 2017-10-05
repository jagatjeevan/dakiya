import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Footer from '../../components/Footer/';

import Dashboard from '../../views/Dashboard/';
import Charts from '../../views/Charts/';
import Widgets from '../../views/Widgets/';
import Buttons from '../../views/Components/Buttons/';
import Cards from '../../views/Components/Cards/';
import Forms from '../../views/Components/Forms/';
import Modals from '../../views/Components/Modals/';
import SocialButtons from '../../views/Components/SocialButtons/';
import Switches from '../../views/Components/Switches/';
import Tables from '../../views/Components/Tables/';
import Tabs from '../../views/Components/Tabs/';
import FontAwesome from '../../views/Icons/FontAwesome/';
import SimpleLineIcons from '../../views/Icons/SimpleLineIcons/';

import ListParcel from '../../components/source/ListParcel';
import AddParcel from '../../components/source/AddParcelPage';
import Notification from '../../components/source/Notification';
import SeedData from '../../components/source/SeedData';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Parse from '../../actions/parseConfig';
import { loginSuccess } from '../../actions/auth';

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

function dispatchActionToProps(dispatch) {
  return {
    loginSuccess: bindActionCreators(loginSuccess, dispatch),
  };
}

class Full extends Component {

  componentWillMount() {
    const user = Parse.User.current();
    if(user){
      this.props.loginSuccess(user);
    }
  }

  render() {
    const { from } = { from: { pathname: '/login' } }
    if (this.props.auth.isLoggedIn === false) {
      return (
        <Redirect to={from}/>
      )
    }
    
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props} />
          <main className="main">
            <Breadcrumb />
            <Notification />
            <div className="container-fluid">
              <Switch>
                <Route path="/parcels" name="Parcels" component={ListParcel} />
                <Route path="/addParcel" name="Parcels" component={AddParcel} />
                <Route path="/dashboard" name="Dashboard" component={Dashboard} />
                <Route path="/seeddata" name="Seed Data" component={SeedData} />
                <Route path="/components/buttons" name="Buttons" component={Buttons} />
                <Route path="/components/cards" name="Cards" component={Cards} />
                <Route path="/components/forms" name="Forms" component={Forms} />
                <Route path="/components/modals" name="Modals" component={Modals} />
                <Route path="/components/social-buttons" name="Social Buttons" component={SocialButtons} />
                <Route path="/components/switches" name="Swithces" component={Switches} />
                <Route path="/components/tables" name="Tables" component={Tables} />
                <Route path="/components/tabs" name="Tabs" component={Tabs} />
                <Route path="/icons/font-awesome" name="Font Awesome" component={FontAwesome} />
                <Route path="/icons/simple-line-icons" name="Simple Line Icons" component={SimpleLineIcons} />
                <Route path="/widgets" name="Widgets" component={Widgets} />
                <Route path="/charts" name="Charts" component={Charts} />
                <Redirect from="/" to="/parcels" />
              </Switch>
            </div>
          </main>
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(mapStateToProps, dispatchActionToProps)(Full);
