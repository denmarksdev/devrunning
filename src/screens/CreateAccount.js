import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import {
    Button,
    Form,
    Segment,

} from 'semantic-ui-react'
import { PATTERN_EMAIL } from '../helpers/regexHelper'

import ActionsCreators from '../redux/actionCreators'
import TimeZoneDropDown, { DEFAULT_TIME_ZONE } from './components/TimeZoneDropDown';
import UnitDropDown, { DEFAULT_UNIT } from './components/UnitDropDown';
import Header from './../Header';

const inputStyle = {
    maxWidth: '300px',
}

class CreateAccount extends React.Component {

    state = {
        error: '',
        timeZone: DEFAULT_TIME_ZONE,
        unit: DEFAULT_UNIT
    }

    componentDidMount() {
        this.props.reset()
    }

    onSubmit = event => {
        event.preventDefault()

        if (this.refs.txtName.value.length < 6) {
            this.setState({ error: 'O nome deve mais de 5 caracteres.' })
            return
        }

        let valid = this.refs.txtEmail.checkValidity()
        if (!valid) {
            this.setState({ error: 'Email inválido.' })
            return
        }
        if (this.refs.txtPasswd.value.length < 3) {
            this.setState({ error: 'A senha deve possuir mais de 2 caracteres.' })
            return
        }
        if (this.refs.txtPasswd.value !== this.refs.txtPasswd2.value) {
            this.setState({ error: 'A senha deve ser igual a de confirmação.' })
            return
        }

        const userInfo = {
            name: this.refs.txtName.value,
            email: this.refs.txtEmail.value,
            passwd: this.refs.txtPasswd.value,
            timeZone: this.state.timeZone,
            unit: this.state.unit,
        }
        this.props.save(userInfo)
        this.setState({ error: '' })
    }

    render() {
        const { auth, } = this.props

        const {
            timeZone,
            unit,
        } = this.state

        return (
            <Fragment>
                <Header />
                {
                    auth.isSaved &&
                    <Segment color='green'>Consta criada com sucesso!</Segment>
                }
                {
                    auth.error &&
                    <Segment color='red'>{auth.errorMessage}</Segment>
                }
                {
                    !auth.isSaved &&
                    <Form style={{ margin: '10px' }} onSubmit={e => this.onSubmit(e)} >
                        <h1>Criar conta</h1>
                        {
                            this.state.error &&
                            <Segment color='red'>{this.state.error}</Segment>
                        }
                        <Form.Field style={inputStyle}>
                            <label>Nome</label>
                            <input
                                required
                                placeholder='Nome ...'
                                ref='txtName' />
                        </Form.Field>
                        <Form.Field style={inputStyle}>
                            <label>Email</label>
                            <input
                                required
                                type='email'
                                pattern={PATTERN_EMAIL}
                                placeholder='Email ...'
                                ref='txtEmail' />
                        </Form.Field>
                        <Form.Field>
                            <label>Time Zone</label>
                            <TimeZoneDropDown
                                timeZone={timeZone}
                                onChange={(e, { value }) => {
                                    this.setState({ timeZone: value })
                                }} />
                        </Form.Field>
                        <Form.Field>
                            <label>Unidade de médida</label>
                            <UnitDropDown
                                unit={unit}
                                onChange={(e, { value }) => this.setState({ unit: value })} />
                        </Form.Field>
                        <Form.Field style={inputStyle}>
                            <label>Senha</label>
                            <input
                                autoComplete='new-password'
                                required
                                type='password'
                                placeholder='Senha ...'
                                ref='txtPasswd' />
                        </Form.Field>
                        <Form.Field style={inputStyle}>
                            <label>Repetir senha</label>
                            <input
                                autoComplete='new-password'
                                required
                                type='password'
                                placeholder='Repetir senha ...'
                                ref='txtPasswd2' />
                        </Form.Field>
                        <Button primary type='submit' >Criar conta</Button>
                    </Form>
                }
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        save: user => dispatch(ActionsCreators.createProfileRequest(user)),
        reset: () => dispatch(ActionsCreators.createProfileReset())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount)