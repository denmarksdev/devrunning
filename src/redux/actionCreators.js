import  { createActions } from 'reduxsauce'

export const {
    Types,
    Creators
} = createActions({
    signinRequest: ['email', 'passwd'],
    signinSuccess: ['user'],
    signinFailure: ['error'],

    authRequest:null,
    authSuccess: ['user'],
    authFailure: ['error']
})

export default Creators