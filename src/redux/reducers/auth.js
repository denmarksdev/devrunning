import  { createReducer } from 'reduxsauce'
import { Types } from '../actionCreators'

export const INITIAL_STATE = {
    isAuthing: false,
    isAuth: false,
    isSigningin:false,
    user:{},
    error: false,
    errorMessage: '',
    isSaving: false
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

export const authRequest = (state = INITIAL_STATE , action) => {
    return {
        ...state,
        isSigningin: true,
        error:false,
        errorMessage:''
    }
}

export const authSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isSigningin: false,
        isAuth: true,
        user: action.user
    }
}

export const authFailure = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isSigningin: false,
        isAuth: false,
        error:false,
        errorMessage:action.error
    }
}

export const logoutSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isSigningin: false,
        isAuth: false,
        user: {}
    }
}


export const updateProfileRequest = (state = INITIAL_STATE , action) => {
    return {
        ...state,
        isSaving:true,
        error:false,
        errorMessage:''
    }
}

export const updateProfileSuccess = (state = INITIAL_STATE, action) => {

    const newUser = {
        ...state.user
    }

    Object.keys(action.user).forEach(key => {
        newUser[key] = action.user[key]
    })

    return {
        ...state,
        isSaving:false,
        user: newUser
    }
}

export const updateProfileFailure = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isSaving:true,
        error:true,
        errorMessage:action.error
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

    [Types.UPDATE_PROFILE_REQUEST]:updateProfileRequest,
    [Types.UPDATE_PROFILE_SUCCESS]:updateProfileSuccess,
    [Types.UPDATE_PROFILE_FAILURE]:updateProfileFailure,
}

export default createReducer(INITIAL_STATE, HANDLERS)