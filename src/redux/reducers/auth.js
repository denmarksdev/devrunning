import  { createReducer } from 'reduxsauce'
import { Types } from '../actionCreators'

export const INITIAL_STATE = {
    isAuthing: false,
    isAuth: false,
    isSigningin:false,
    user:{},
    error: false,
    errorMessage: ''
}

export const signinRequest = (state = INITIAL_STATE , action) => {
    return {
        ...state,
        isSigningin: true,
        error:false,
        errorMessage:''
    }
}

export const signinSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isSigningin: false,
        isAuth: true,
        user: action.user
    }
}

export const siginFailure = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isSigningin: false,
        error:true,
        errorMessage:action.error
    }
}

export const HANDLERS = {
    [Types.SIGNIN_REQUEST]:signinRequest,
    [Types.SIGNIN_SUCCESS]: signinSuccess,
    [Types.SIGNIN_FAILURE]: siginFailure
}

export default createReducer(INITIAL_STATE, HANDLERS)
