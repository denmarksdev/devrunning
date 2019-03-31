import React from 'react';
import { connect } from 'react-redux';
import { Route, Link, Redirect } from 'react-router-dom';
import {
    Container,
    Row,
    Col,
    Nav
} from 'react-bootstrap'

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
        return <Redirect to='/login'/>
    }
    else if (auth.user.role !== 'admin') {
        return <Redirect to='/restrito'/>
    }

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Admin {JSON.stringify(auth)}</h1>
                    <Nav>
                        <Nav.Item>
                            <Link className='nav-link' to='/admin'>Home</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link className='nav-link' to='/admin/users'>Users</Link>
                        </Nav.Item>
                    </Nav>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Route exact path={`${path}/`} component={Home} />
                    <Route exact path={`${path}/users`} component={Users} />
                </Col>
            </Row>
        </Container>
    )
}

const mapStateToProps = state => {
    return {
        auth:state.auth
    }
}

export default connect(mapStateToProps)(Admin)