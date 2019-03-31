import React from 'react'
import { connect } from 'react-redux'
 import ActionCreators from '../../../redux/actionCreators'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import UserOptions from './../../components/UserOptions';

const style = {
    marginLeft: '5px'
}

const Header = ({ auth, logout }) => {
    return (
        <Menu>
            <Menu.Item>Corridas Online <strong  style={style} >Admin</strong></Menu.Item>
            <Menu.Item as={Link} to='/admin/'>Home</Menu.Item>
            <Menu.Item as={Link} to='/admin/users'>Usuários</Menu.Item>
            <Menu.Item as={Link} to='/'>Voltar</Menu.Item>
            <UserOptions auth={auth} logout={logout} />
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
        sigin: (email, passwd) => ActionCreators.signinRequest(email, passwd),
        logout: ()=> dispatch( ActionCreators.logoutRequest())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)