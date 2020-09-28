import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import API from '../../lib/API';
import TokenStore from '../../lib/TokenStore';
import AuthContext from '../../contexts/AuthContext';
import DateContext from '../../contexts/DateContext'
import Navigation from '../../components/Navigation/Navigation';
import PrivateRoute from '../../components/PrivateRoute/PrivateRoute';
// import Home from '../../pages/Home/Home';
import Login from '../../pages/Login/Login';
import Tracker from '../../pages/Tracker';
import NotFound from '../../pages/NotFound/NotFound';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.handleLogin = (user, authToken) => {
      TokenStore.setToken(authToken);
      this.setState(prevState => ({ auth: { ...prevState.auth, user, authToken } }));
    };

    this.handleLogout = () => {
      TokenStore.clearToken();
      this.setState(prevState => ({ auth: { ...prevState.auth, user: undefined, authToken: undefined } }));
    }
    this.handleWeek = (weekNum) => {
      this.setState(prevState => ({ date: { ...prevState.date, week: weekNum } }))
    }
    this.handleDay = (dayNum) => {
      this.setState(prevState => ({ date: { ...prevState.date, day: dayNum } }))
    }
    this.state = {
      auth: {
        user: undefined,
        authToken: TokenStore.getToken(),
        onLogin: this.handleLogin,
        onLogout: this.handleLogout
      },
      date: {
        week: 0,
        day: 0,
        setWeek: this.handleWeek,
        setDate: this.handleDay
      }
    }
  }

  componentDidMount() {
    const { authToken } = this.state.auth;
    if (!authToken) return;

    API.Users.getMe(authToken)
      .then(response => response.data)
      .then(user => this.setState(prevState => ({ auth: { ...prevState.auth, user } })))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <AuthContext.Provider value={this.state.auth}>
        <DateContext.Provider value={this.state.date}>
          <Navigation />
          <div className='container-fluid p-0'>
            <Switch>
              <PrivateRoute exact path='/' component={Tracker} />
              <Route path='/login' component={Login} />
              <PrivateRoute path='/tracker' component={Tracker} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </DateContext.Provider>
      </AuthContext.Provider >
    );
  }
}

export default App;
