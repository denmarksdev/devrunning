import { takeLatest, all, put } from 'redux-saga/effects'
import { Types } from '../actionCreators'
import ActionCreators from '../actionCreators';
import Api from '../../service/Api'
import { BASE_URL } from './../../consts/webConst';
import {
  auth,
  login,
  logout,
  updateProfile,
  createProfile
} from '../sagas/auth'
import {
  getRuns,
  createRun,
  removeRun
} from '../sagas/runs'
import {
  getUsers,
  getUser,
  deleteUser,
  updateUser
} from '../sagas/users'

const api = new Api(BASE_URL)

export default function* roorSaga() {
  yield all([
    takeLatest(Types.SIGNIN_REQUEST, login({ api })),
    takeLatest(Types.AUTH_REQUEST, auth({ api })),
    takeLatest(Types.LOGOUT_REQUEST, logout),

    takeLatest(Types.GET_RUNS_REQUEST, getRuns({ api })),
    takeLatest(Types.CREATE_RUN_REQUEST, createRun({ api })),
    takeLatest(Types.REMOVE_RUN_REQUEST, removeRun({ api })),

    takeLatest(Types.UPDATE_PROFILE_REQUEST, updateProfile({ api })),
    takeLatest(Types.CREATE_PROFILE_REQUEST, createProfile({ api })),

    takeLatest(Types.GET_USERS_REQUEST, getUsers({ api })),
    takeLatest(Types.GET_USER_REQUEST, getUser({ api })),
    takeLatest(Types.REMOVE_USER_REQUEST, deleteUser({ api })),
    takeLatest(Types.UPDATE_USER_REQUEST, updateUser({ api })),

    put(ActionCreators.authRequest())
  ])
}