import ActionCreators from '../actionCreators'
import { put, call } from 'redux-saga/effects';

export const getUsers = ({ api }) => function* (action) {
    const response = yield call(api.getUsers)
    yield put(ActionCreators.getUsersSuccess(response.data))
}

export const getUser = ({ api }) => function* (action) {
    const response = yield call(api.getUser, action.id)
    yield put(ActionCreators.getUserSuccess(response.data))
}

export const deleteUser = ({ api }) => function* removeUser(action) {
    yield call(api.deleteUser, action.id)
    yield put(ActionCreators.removeUserSuccess(action.id))
}

export const  updateUser = ({ api }) => function* (action) {
    yield call( api.updateUser, action.user)
    yield put(ActionCreators.updateUserSuccess(action.user))
}