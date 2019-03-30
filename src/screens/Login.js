import React, { useState } from 'react';
import {
    Container,
    Form,
    FormControl,
    Button
} from 'react-bootstrap'

import ActionCreator from '../redux/actionCreators'
import { connect } from 'react-redux';

class Login extends React.Component {

    state = {
        form: {
            email: '',
            passwd: ''
        }
    }

    onFormInputChange = name => event => {
        const form = {
            ...this.state.form
        };
        form[name] = event.target.value
        this.setState({ form })
    }

    onSubmit = event => {
        event.preventDefault()
        const { email, passwd } = this.state.form
        this.props.login(email, passwd)
    }

    render() {
        const form = this.state
        console.log(JSON.stringify(this.props))
        return (
            <Container>
                <Form onSubmit={this.onSubmit} >
                    <h1>Login</h1>
                    <Form.Group>
                        <Form.Label>Emaill</Form.Label>
                        <FormControl
                            placeholder='Enter email'
                            value={form.email}
                            onChange={this.onFormInputChange('email')} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Senha</Form.Label>
                        <FormControl
                            type='password'
                            placeholder='Password'
                            value={form.passwd}
                            onChange={this.onFormInputChange('passwd')} />
                    </Form.Group>
                    <Button variant='primary' type='submit' >
                        Submit
                    </Button>
                </Form>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (email, passwd) => dispatch( ActionCreator.signinRequest(email,passwd) )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)