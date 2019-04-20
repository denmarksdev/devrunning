import { takeLatest, all, put } from 'redux-saga/effects'
import { Types } from '../actionCreators'
import ActionCreators from '../actionCreators';
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


export default function* roorSaga() {
  yield all([
    takeLatest(Types.SIGNIN_REQUEST, login),
    takeLatest(Types.AUTH_REQUEST, auth),
    takeLatest(Types.LOGOUT_REQUEST, logout),

    takeLatest(Types.GET_RUNS_REQUEST, getRuns),
    takeLatest(Types.CREATE_RUN_REQUEST, createRun),
    takeLatest(Types.REMOVE_RUN_REQUEST, removeRun),
    
    takeLatest(Types.UPDATE_PROFILE_REQUEST, updateProfile),
    takeLatest(Types.CREATE_PROFILE_REQUEST, createProfile),

    put(ActionCreators.authRequest())
  ])
}