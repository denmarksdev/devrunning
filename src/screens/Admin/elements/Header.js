import React from 'react'
import { connect } from 'react-redux'
import ActionCreators from '../../../redux/actionCreators'
import { Link } from 'react-router-dom'
import { Menu, Image } from 'semantic-ui-react'
import UserOptions from './../../components/UserOptions';
import logo from '../../../assets/logo.png'


const Header = ({ auth, logout }) => {
    return (
        <Menu>
            <Menu.Item as={Link} to='/' ><Image src={logo} size='small' centered /></Menu.Item>
            <Menu.Item as={Link} to='/admin/'>Home</Menu.Item>
            <Menu.Item as={Link} to='/admin/users'>Usuários</Menu.Item>
            <Menu.Item as={Link} to='/admin/runs'>Runs</Menu.Item>
            <UserOptions 
                auth={auth} 
                logout={logout} 
                pathChangePass='/admin/change-pass'
                mode='Modo usuario'
                to='/restrito'/>
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