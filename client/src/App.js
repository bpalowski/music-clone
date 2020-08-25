import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './auth/index'

import { connect } from 'react-redux'

import './App.css';
import MusicMock from './views/MusicMock'
import Main from './views/Main'
import Error from './components/Error'


// import UserComponent from './components/UserComponent'


class App extends Component {
  render() {
    return (
      <div className="App" >

        <Switch>
          <Route
            exact
            path="/"
            component={Main}
          />

          <PrivateRoute
            authed={this.props.authenticated}
            path='/musicmock'
            component={MusicMock}
          />
          {/* <PrivateRoute
            authed={this.props.authenticated}
            path='/profile'
            component={UserComponent}
          /> */}
          <Route
            component={Error}
          />
        </Switch>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  authenticated: state.userData.authenticated
});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(App)

