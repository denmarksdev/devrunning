import React, { Fragment } from 'react'
import { connect } from 'react-redux';
import { Redirect, Link, Route } from 'react-router-dom';
import Home from './Home';
import Runs from './Runs';
import Header from './elements/Header';

const Restrito = props => {
    const { auth, match } = props

    if (!auth.isAuth) {
        return <Redirect to='/login' />
    }

    return (
        <Fragment>
            <Header />
            <Route exact path={`${match.path}/`} component={Home} />
            <Route exact path={`${match.path}/runs`} component={Runs} />
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Restrito)