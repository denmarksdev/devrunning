import React from 'react'
import { connect } from 'react-redux'
import ActionCreators from '../../../redux/actionCreators'
import { Link } from 'react-router-dom'
import UserOptions from '../../components/UserOptions'
import { 
    Menu,
} from 'semantic-ui-react'

const style = {
    marginLeft: '5px'
}

const Header = ({ auth, logout }) => {
    return (
        <Menu>
            <Menu.Item>Corridas Online  <strong  style={style} >Restrito</strong></Menu.Item>
            <Menu.Item as={Link} to='/restrito/'>Home</Menu.Item>
            <Menu.Item as={Link} to='/restrito/runs'>Runs</Menu.Item>
            <Menu.Item as={Link} to='/'>Voltar</Menu.Item>
            <UserOptions 
                auth={auth} 
                logout={logout}
                path='/restrito/my-account'
                 />
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