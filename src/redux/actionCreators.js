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

    getRunsRequest: null,
    getRunsSuccess: ['runs'],
    getRunsFailure: null,

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

    createProfileReset: null,
    createProfileRequest: ['user'],
    createProfileSuccess: ['user'],
    createProfileFailure: ['error'],


    

})

export default Creators