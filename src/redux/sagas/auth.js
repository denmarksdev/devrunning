import { put, call } from 'redux-saga/effects'
import jwtDecode from 'jwt-decode';
import ActionCreators from '../actionCreators'
import {
  STORAGE_TOKEN,
  STORAGE_USER
} from '../../consts/webConst'

export const login = ({ api }) => function* (action) {

  let token = localStorage.getItem(STORAGE_TOKEN)
  if (!token) {
    const login = yield call(api.login, {
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

export const auth = ({ api }) => function* () {
  const token = localStorage.getItem(STORAGE_TOKEN)
  if (token) {
    try {
      const user = yield call(api.auth)
      yield put(ActionCreators.authSuccess(user.data))
    } catch (error) {
      console.log(error)
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

export const updateProfile = ({ api }) => function* (action) {
  yield call(api.updateProfile, action.user)
  yield put(ActionCreators.updateProfileSuccess(action.user))
}

export const createProfile = ({ api }) => function* (action) {
  const user = call(api.createProfile, action.user)
  if (user && user.data && user.data.error) {
    yield put(ActionCreators.createProfileFailure(user.data.message))
  } else {
    yield put(ActionCreators.createProfileSuccess(action.user))
    yield put(ActionCreators.signinRequest(
      action.email,
      action.passwd
    ))
  }
}