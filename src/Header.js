import React from 'react'
import { connect } from 'react-redux'
import ActionCreators from './redux/actionCreators'
import logo from './logo.svg';

const Header = props => {
    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
                Edit <code>src/App.js</code> and save to reload.
            </p>
        </header>
    )
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sigin: (email, passwd) => ActionCreators.signinRequest(email, passwd)
    }
}  

export default connect(mapStateToProps, mapDispatchToProps)(Header)
