import React, { Fragment } from 'react'
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import Home from './Home';
import Runs from './Runs';
import Header from './elements/Header';
import ChangePass from './ChangePass'
import MyAccount from './MyAccount';


const Restrito = props => {
    const { auth, match } = props

    if (auth.isSigningin) {
        return <p>Is loading ...</p>
    }

    if (!auth.isAuth) {
        return <Redirect to='/login' />
    }

    return (
        <Fragment>
            <Header />
            <Route exact path={`${match.path}/`} component={Home} />
            <Route exact path={`${match.path}/runs`} component={Runs} />
            <Route path={`${match.path}/my-account`} component={MyAccount} />
            <Route path={`${match.path}/change-pass`} component={ChangePass} />
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Restrito)