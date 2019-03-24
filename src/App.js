import React, { Component } from 'react';

import './App.css';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import store from './redux'
import { Provider } from 'react-redux'
import Header from './Header';



const STORAGE_TOKEN = 'token';
const BASE_URL = 'http://localhost:3001/users';
class App extends Component {

  /*
  async componentDidMount() {
    let token = localStorage.getItem(STORAGE_TOKEN)
    if (!token) {
      const login = await axios.post(BASE_URL+'/login', {
        "email": "tuliofaria@devpleno.com",
        "passwd": "abc123"
      })
      token = login.data.token
      localStorage.setItem(STORAGE_TOKEN, token)
    }
    const decoded = jwtDecode(token)
    console.log(decoded)

    const response  = await axios.get(BASE_URL + '/me', {
      headers:{
        Authorization: 'Bearer ' + token
      }
    })
    console.log(response.data)
  }

 */

  render() {
    return (
      <Provider store={store}>
        <div className="App">
         <Header />
        </div>
      </Provider>
    );
  }
}

export default App;
