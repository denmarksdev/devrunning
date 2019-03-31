import React from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Restrito = props => {
    const { auth } = props

    if (!auth.isAuth) {
        return <Redirect to='/login' />
    }

    return (
        <h1>Restrito</h1>
    )
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Restrito)