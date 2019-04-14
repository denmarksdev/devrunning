import React from 'react'
import { connect } from 'react-redux'
import ActionCreators from './redux/actionCreators'
import { Link, Redirect } from 'react-router-dom'
import { Menu, Image } from 'semantic-ui-react'
import logo from './assets/logo.png'
const Header = ({auth}) => {

    if (auth.isAuth) {
        return <Redirect to='/restrito' />
    }

    return (
        <Menu>
            <Menu.Item as={Link} to='/' ><Image src={logo} size='small' centered /></Menu.Item>
            <Menu.Item as={Link} to='/' >Home</Menu.Item>
            <Menu.Item as={Link} to='/create-account'>Criar uma conta</Menu.Item>
            <Menu.Item as={Link} to='/login'>Entrar</Menu.Item>
        </Menu>
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
