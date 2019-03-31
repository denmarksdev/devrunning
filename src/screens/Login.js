import React from 'react';
import {
    Container,
    Form,
    FormControl,
    Button,
    Alert
} from 'react-bootstrap'

import ActionCreator from '../redux/actionCreators'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

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
        const { auth } = this.props

        if (auth.isAuth) {
            if (auth.user.role === 'admin')
                return <Redirect to='/admin' />
            else
                return <Redirect to='/restrito' />
        }

        return (
            <Container>
                <Form>
                    <h1>Login</h1>
                    <Form.Group>
                        <Form.Label>Emaill</Form.Label>
                        <FormControl
                            placeholder='Enter email'
                            type='text'
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
                    {
                        auth.error &&
                        <Alert variant='danger'>{auth.errorMessage}</Alert>
                    }
                    <Button variant='primary' onClick={this.onSubmit} >
                        Submit
                    </Button>
                </Form>
            </Container >
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
        login: (email, passwd) => dispatch(ActionCreator.signinRequest(email, passwd))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)