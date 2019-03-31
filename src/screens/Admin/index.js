import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Link, Redirect } from 'react-router-dom';

import Header from './elements/Header';

const Home = props => {
    return <h1>Home admin</h1>
}

const Users = props => {
    return <h1>Users admin</h1>
}

const Admin = props => {
    const { path } = props.match
    const { auth } = props

    if (!auth.isAuth) {
        return <Redirect to='/login' />
    }
    else if (auth.user.role !== 'admin') {
        return <Redirect to='/restrito' />
    }

    return (
        <Fragment>
            <Header />
            <Route exact path={`${path}/`} component={Home} />
            <Route exact path={`${path}/users`} component={Users} />
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Admin)