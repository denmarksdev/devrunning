import React from 'react'
import { connect } from 'react-redux'
import ActionCreators from './redux/actionCreators'
import logo from './logo.svg';

import { Link } from 'react-router-dom'
import { Nav } from 'react-bootstrap'

const Header = props => {
    return (
        <header className="App-header">
            <Nav>
                <Nav.Item>
                    <Nav.Link >
                        <Link to='/'>Home</Link>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link >
                        <Link to='/admin'>Admin</Link>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link >
                        <Link to='/restrito'>Restrito</Link>
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link >
                        <Link to='/login'>Login</Link>
                    </Nav.Link>
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
