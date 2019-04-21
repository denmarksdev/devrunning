import { createReducer } from 'reduxsauce'
import { Types } from '../actionCreators'

export const INITIAL_STATE = {
    isLoading: false,
    data: [],
    newRun: {},
    saved: false,
    isSaving: false,
    user: {},
}

export const getUsersRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLoading: true
    }
}

export const getUsersSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        data: action.users
    }
}

export const getUsersFailure = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.error
    }
}

export const getUserRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLoading: true,
        id:action.id
    }
}

export const getUserSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        user: action.user
    }
}

export const getUserFailure = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.error
    }
}


export const removeUserRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLoading: true
    }
}

export const removeUserSuccess = (state = INITIAL_STATE, action) => {
    let users = state.data
    users = users.filter( u=> u.id !== action.id  )

    return {
        ...state,
        data: users,
        saved:true,
    }
}

export const removeUserFailure = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.error
    }
}


export const updateUserRequest = (state = INITIAL_STATE, action) => {
    console.log('User Request')
    return {
        ...state,
        isLoading: true,
        data:action.user
    }
}

export const updateUserSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        data: action.user,
        saved:true,
    }
}

export const updateUserFailure = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLoading: false,
        error: true,
        errorMessage: action.error
    }
}

export const updateUserReset = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLoading: false,
        error: false,
        saved:false,
        data: {}
    }
}

export const HANDLERS = {
    [Types.GET_USERS_REQUEST]: getUsersRequest,
    [Types.GET_USERS_SUCCESS]: getUsersSuccess,
    [Types.GET_USERS_FAILURE]: getUsersFailure,

    [Types.GET_USER_REQUEST]: getUserRequest,
    [Types.GET_USER_SUCCESS]: getUserSuccess,
    [Types.GET_USER_FAILURE]: getUserFailure,

    [Types.REMOVE_USER_REQUEST]: removeUserRequest,
    [Types.REMOVE_USER_SUCCESS]: removeUserSuccess,
    [Types.REMOVE_USER_FAILURE]: removeUserFailure,

    [Types.UPDATE_USER_REQUEST]: updateUserRequest,
    [Types.UPDATE_USER_SUCCESS]: updateUserSuccess,
    [Types.UPDATE_USER_FAILURE]: updateUserFailure,
    [Types.UPDATE_USER_RESET]: updateUserReset,
}

export default createReducer(INITIAL_STATE, HANDLERS)