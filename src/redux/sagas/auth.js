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
      const user = yield axios.get(BASE_URL + '/users/me', {
        headers: {
          Authorization: 'Bearer ' + token
        },
      })
      yield put(ActionCreators.authSuccess(user.data))
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

export function* updateProfile(action) {
  const token = localStorage.getItem(STORAGE_TOKEN)
  const userToSave = {
    ...action.user
  }
  yield axios.patch(`${BASE_URL}/users/${action.user.id}`, userToSave, {
    headers: {
      Authorization: 'Bearer ' + token
  },
  })
  yield put(ActionCreators.updateProfileSuccess(userToSave))
}


export function* createProfile(action) {
  const userToSave = {
    ...action.user
  }
  const user = yield axios.post(`${BASE_URL}/users`, userToSave)

  if (user && user.data && user.data.error) {
    yield put(ActionCreators.createProfileFailure(user.data.message))
  } else {
    yield put(ActionCreators.createProfileSuccess(userToSave))
    yield put(ActionCreators.signinRequest(
      userToSave.email,
       userToSave.passwd
    ))
  }
}