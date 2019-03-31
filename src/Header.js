import React from 'react'
import { connect } from 'react-redux'
import ActionCreators from './redux/actionCreators'
import { Link } from 'react-router-dom'
import { Nav } from 'react-bootstrap'

const Header = props => {
    return (
        <header className="App-header">
            <Nav>
                <Nav.Item>
                    <Link className='nav-link' to='/'>Home</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link className='nav-link' to='/admin'>Admin</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link className='nav-link' to='/restrito'>Restrito</Link>
                </Nav.Item>
                <Nav.Item>
                    <Link className='nav-link' to='/login'>Login</Link>
                </Nav.Item>
            </Nav>
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
