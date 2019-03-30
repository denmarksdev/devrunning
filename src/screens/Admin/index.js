import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
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
    return (
        <Container>
            <Row>
                <Col>
                    <h1>Admin</h1>
                    <Nav>
                        <Nav.Item>
                            <Nav.Link>
                                <Link to='/admin'>Home</Link>
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link>
                                <Link to='/admin/users'>Users</Link>
                            </Nav.Link>
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

export default Admin