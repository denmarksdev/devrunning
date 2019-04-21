import { createActions } from 'reduxsauce'

export const {
    Types,
    Creators
} = createActions({
    signinRequest: ['email', 'passwd'],
    signinSuccess: ['user'],
    signinFailure: ['error'],

    authRequest: null,
    authSuccess: ['user'],
    authFailure: ['error'],

    logoutRequest: null,
    logoutSuccess: null, 
    logoutFailure: ['erro'],

    getRunsRequest: ['admin'],
    getRunsSuccess: ['runs'],
    getRunsFailure: null,

    getUsersRequest: null,
    getUsersSuccess: ['users'],
    getUsersFailure: null,

    getUserRequest: ['id'],
    getUserSuccess: ['user'],
    getUserFailure: null,

    removeRunRequest: ['id'],
    removeRunSuccess: ['id'],
    removeRunFailure: ['error'],

    createRunReset:  null,
    createRunRequest: ['run'],
    createRunSuccess: ['run'],
    createRunFailure: ['error'],
    //'friendly_name','duration', 'distance', 'created'

    updateProfileReset: null,
    updateProfileRequest: ['user'],
    updateProfileSuccess: ['user'],
    updateProfileFailure: ['error'],


    updateUserReset: null,
    updateUserRequest: ['user'],
    updateUserSuccess: ['user'],
    updateUserFailure: ['error'],

    createProfileReset: null,
    createProfileRequest: ['user'],
    createProfileSuccess: ['user'],
    createProfileFailure: ['error'],

    removeUserRequest: ['id'],
    removeUserSuccess: ['id'],
    removeUserFailure: ['error'],
})

export default Creators