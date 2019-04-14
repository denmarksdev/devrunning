import React, { Fragment } from 'react';
import ActionCreator from '../redux/actionCreators'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import {
    Form,
    Button,
    Label,
} from 'semantic-ui-react'

import Header from '../Header'

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
            <Fragment>
                <Header />
                <h1>Entrar</h1>
                <Form>
                    <Form.Field  >
                        <label>Email</label>
                        <Form.Input
                            type='text'
                            value={form.email}
                            onChange={this.onFormInputChange('email')} />
                    </Form.Field>
                    <Form.Field >
                        <label>Senha</label>
                        <input
                            type='password'
                            value={form.passwd}
                            onChange={this.onFormInputChange('passwd')} />
                    </Form.Field>
                    <div style={{ display:'flex', flexDirection:'column' }} >
                        {
                            auth.error &&
                            <Label basic color='red' style={{ maxWidth:'120px', margin:'10px 0', color:'#fff' }}>
                                {auth.errorMessage}
                            </Label>
                        }
                        <Button 
                             style={{ maxWidth:'100px' }}
                             onClick={this.onSubmit}
                             primary                              >
                              Logar
                        </Button>
                    </div>
                </Form>
            </Fragment>
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