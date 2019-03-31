import { takeLatest, all, put } from 'redux-saga/effects'
import { Types } from '../actionCreators'
import ActionCreators from '../actionCreators';
import {
  auth,
  login,
  logout
} from '../sagas/auth'
import {
  getRuns,
  createRun
} from '../sagas/runs'


export default function* roorSaga() {
  yield all([
    takeLatest(Types.SIGNIN_REQUEST, login),
    takeLatest(Types.AUTH_REQUEST, auth),
    takeLatest(Types.LOGOUT_REQUEST, logout),

    takeLatest(Types.GET_RUNS_REQUEST, getRuns),
    takeLatest(Types.CREATE_RUN_REQUEST, createRun),

    put(ActionCreators.authRequest())
  ])
}