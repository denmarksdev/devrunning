import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import Header from './elements/Header';
import Runs from'./Runs';
import MyAccount from'./MyAccount';
import ChangePass from'./ChangePass';
import Users from'./Users';
import EditUser from './EditUser';

const Home = props => {
    return <h1>Home admin</h1>
}


const Admin = props => {
    const { path } = props.match
    const { auth } = props

    if (auth.isSigningin) {
        return <p>Is loading ...</p>
    }

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
            <Route exact path={`${path}/users/:id/edit`} component={EditUser} />
            <Route exact path={`${path}/users`} component={Users} />
            <Route exact path={`${path}/runs`} component={Runs} />
            <Route exact path={`${path}/my-account`} component={MyAccount} />
            <Route exact path={`${path}/change-pass`} component={ChangePass} />
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Admin)