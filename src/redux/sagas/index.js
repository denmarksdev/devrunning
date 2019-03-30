import { takeLatest, all, put  } from 'redux-saga/effects'
import { Types } from '../actionCreators'
import axios from 'axios'
import jwtDecode from 'jwt-decode';
import ActionCreators from '../actionCreators';

const STORAGE_TOKEN = 'token';
const BASE_URL = 'http://localhost:3001/users';

function* login(action)  {
    let token = localStorage.getItem(STORAGE_TOKEN)
    if (!token) {
      const login = yield axios.post(BASE_URL+'/login', {
        "email": action.email,
        "passwd": action.passwd
      })
      if (login.data.token){
        token = login.data.token
        localStorage.setItem(STORAGE_TOKEN, token)
        const user = jwtDecode(token)
        localStorage.setItem('user', user )
        yield put(ActionCreators.signinSuccess(user))
      }
    }
}

export default function* roorSaga(){
    yield all([
        takeLatest(Types.SIGNIN_REQUEST, login)
    ])
}