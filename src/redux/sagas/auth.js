import { put } from 'redux-saga/effects'
import axios from 'axios'
import jwtDecode from 'jwt-decode';
import ActionCreators from '../actionCreators'
import { 
    BASE_URL, 
    STORAGE_TOKEN, 
    STORAGE_USER 
} from '../../consts/webConst'

export function* login(action) {
    console.log('Login generator')
  
    let token = localStorage.getItem(STORAGE_TOKEN)
    if (!token) {
      const login = yield axios.post(BASE_URL + '/users/login', {
        "email": action.email,
        "passwd": action.passwd
      })
      if (login.data.token) {
        token = login.data.token
        localStorage.setItem(STORAGE_TOKEN, token)
        const user = jwtDecode(token)
        localStorage.setItem(STORAGE_USER, user)
        yield put(ActionCreators.signinSuccess(user))
      } else {
        yield put(ActionCreators.signinFailure(login.data.message))
      }
    }
  }
  
export function* auth() {
    const token = localStorage.getItem(STORAGE_TOKEN)
    if (token) {
      try {
        const user = jwtDecode(token)
        yield put(ActionCreators.authSuccess(user))
      } catch (error) {
        yield put(ActionCreators.authFailure('invalid token'))
      }
    } else {
      yield put(ActionCreators.authFailure('token not found'))
    }
  }
  
 export function* logout() {
    localStorage.removeItem(STORAGE_TOKEN)
    localStorage.removeItem(STORAGE_USER)
    yield put(ActionCreators.logoutSuccess())
  }
  