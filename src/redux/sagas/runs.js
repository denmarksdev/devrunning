import axios from 'axios'
import { BASE_URL, STORAGE_TOKEN } from './../../consts/webConst';
import ActionCreators from '../actionCreators'
import { put } from 'redux-saga/effects';

export function* getRuns() {
    const token = localStorage.getItem(STORAGE_TOKEN)
    console.log(token)

    const response = yield axios.get(BASE_URL + '/runs', {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
    yield put(ActionCreators.getRunsSuccess(response.data.data))
}

export function* createRun(action) {
    const token = localStorage.getItem(STORAGE_TOKEN)
    console.log(token)
    console.log()

    const response = yield axios.post(BASE_URL + '/runs',action.run,{
        headers: {
            Authorization: 'Bearer ' + token
        },
    })
    //yield put(ActionCreators.getRunsSuccess(response.data))
}