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
    console.log('signinRequest')
    return {
        ...state,
        isSigningin: true,
        error:false,
        errorMessage:''
    }
}

export const signinSuccess = (state = INITIAL_STATE, action) => {
    console.log('signinSuccess')
    return {
        ...state,
        isSigningin: false,
        isAuth: true,
        user: action.user
    }
}

export const siginFailure = (state = INITIAL_STATE, action) => {
    console.log('siginFailure')
    return {
        ...state,
        isSigningin: false,
        error:true,
        errorMessage:action.error
    }
}

export const authRequest = (state = INITIAL_STATE , action) => {
    console.log('authRequest')
    return {
        ...state,
        isSigningin: true,
        error:false,
        errorMessage:''
    }
}

export const authSuccess = (state = INITIAL_STATE, action) => {
    console.log('authSuccess')
    return {
        ...state,
        isSigningin: false,
        isAuth: true,
        user: action.user
    }
}

export const authFailure = (state = INITIAL_STATE, action) => {
    console.log('authFailure')

    return {
        ...state,
        isSigningin: false,
        isAuth: false,
        error:false,
        errorMessage:action.error
    }
}

export const logoutSuccess = (state = INITIAL_STATE, action) => {
    console.log('logoutSuccess')
    return {
        ...state,
        isSigningin: false,
        isAuth: false,
        user: {}
    }
}

export const HANDLERS = {
    [Types.SIGNIN_REQUEST]:signinRequest,
    [Types.SIGNIN_SUCCESS]:signinSuccess,
    [Types.SIGNIN_FAILURE]:siginFailure,
    
    [Types.AUTH_REQUEST]:authRequest,
    [Types.AUTH_SUCCESS]:authSuccess,
    [Types.AUTH_FAILURE]:authFailure,

    [Types.LOGOUT_SUCCESS]:logoutSuccess,
}

export default createReducer(INITIAL_STATE, HANDLERS)