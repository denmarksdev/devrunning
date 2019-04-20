import axios from 'axios'
import { BASE_URL, STORAGE_TOKEN } from './../../consts/webConst';
import ActionCreators from '../actionCreators'
import { put } from 'redux-saga/effects';

export function* getRuns(action) {
    const token = localStorage.getItem(STORAGE_TOKEN)
    let filter = ''
    if (action.admin){
        filter = '?admin=true'
    }

    const response = yield axios.get(`${BASE_URL}/runs${filter}` , {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
    yield put(ActionCreators.getRunsSuccess(response.data.data))
}

export function* createRun(action) {
    const token = localStorage.getItem(STORAGE_TOKEN)
    const run = yield axios.post(BASE_URL + '/runs',action.run,{
        headers: {
            Authorization: 'Bearer ' + token
        },
    })
    yield put(ActionCreators.createRunSuccess(run.data))
}

export function* removeRun(action) {
    const token = localStorage.getItem(STORAGE_TOKEN)
    yield axios.delete(`${BASE_URL}/runs/${action.id}`,{
        headers: {
            Authorization: 'Bearer ' + token
        },
    })
    yield put(ActionCreators.removeRunSuccess(action.id))
}