import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import {
    Button,
    Form,
    Segment

} from 'semantic-ui-react'

import ActionsCreators from '../../redux/actionCreators'

const inputStyle = {
    maxWidth: '300px',
    marginBottom: '10px'
}

class ChangePass extends React.Component {

    state = {
        error: ''
    }

    componentDidMount() {
        this.props.reset()
    }

    onClick = () => {
        if (this.refs.txtPasswd.value.length < 3) {
            this.setState({ error: 'A senha não deve possuir 6 caracteres.' })
            return
        }
        if (this.refs.txtPasswd.value !== this.refs.txtPasswd2.value) {
            this.setState({ error: 'A senha deve ser igual a de confirmação.' })
            return
        }

        const userInfo = {
            passwd: this.refs.txtPasswd.value,
            id: this.props.auth.user.id
        }
        this.props.save(userInfo)
        this.setState({ error: '' })
    }

    render() {
        return (
            <Fragment>
                {
                    this.props.auth.isSaved &&
                    <Segment color='green'>Senha alterada com sucesso!</Segment>
                }
                {
                    !this.props.auth.isSaved &&
                    <Form style={{ margin: '10px' }}>
                        <h1>Alterar senha</h1>
                        {
                            this.state.error &&
                            <Segment color='red'>{this.state.error}</Segment>
                        }
                        <Form.Field>
                            <label>Senha</label>
                            <input
                                style={inputStyle}
                                type='password'
                                placeholder='Senha ...'
                                ref='txtPasswd' />
                            <label>Repetir senha</label>
                            <input
                                style={inputStyle}
                                type='password'
                                placeholder='Repetir senha ...'
                                ref='txtPasswd2' />
                        </Form.Field>
                        <Button onClick={this.onClick} >Salvar</Button>
                    </Form>
                }
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
        save: user => dispatch(ActionsCreators.updateProfileRequest(user)),
        reset: () => dispatch(ActionsCreators.updateProfileReset())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePass)