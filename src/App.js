import React, { Component } from 'react';

import './App.css';

import store from './redux'
import { Provider } from 'react-redux'

import {
  Route,
  BrowserRouter as Router
} from 'react-router-dom'

import Header from './Header';
import Home from './screens/Home'
import Admin from './screens/Admin'
import Restrito from './screens/Restrito';
import Login from './screens/Login'

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Header />
          <Route exact path='/' component={Home} />
          <Route path='/admin' component={Admin} />
          <Route exact path='/restrito' component={Restrito} />
          <Route exact path='/login' component={Login} />
        </Router>
      </Provider>
    );
  }
  
}

export default App;