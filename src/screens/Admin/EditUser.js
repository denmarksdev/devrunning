import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import ActionsCreators from '../../redux/actionCreators'
import { BaseComponent } from './../components/BaseComponent';
import 'input-moment/dist/input-moment.css'
import { Redirect } from 'react-router-dom'

import {
    Button,
    Form,
    Segment,
    Dropdown
} from 'semantic-ui-react'

const inputStyle = {
    maxWidth: '300px',
    marginBottom: '10px'
}

class UserEdit extends BaseComponent {

    state = {
        error: '',
        user: {
            id: 0,
            name: '',
            email: '',
            role: '',
        },
    }

    componentDidMount() {
        this.props.reset()
        this.props.load(this.props.match.params.id)
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        if (nextProps.users && nextProps.users.user)
            return {
                user: nextProps.users.user
            }

        return null
    }


    onSave = () => {
        const { user } = this.state;
        this.props.save(user)
    }

    render() {

        const { saved } = this.props.users
        const { user } = this.state

        if (saved) {
            return <Redirect to='/admin/users' />
        }

        return (
            <Fragment>
                {
                    (!saved) &&
                    <Form style={{ margin: '10px' }}>
                        <h1>Editar usuário</h1>
                        {
                            this.state.error &&
                            <Segment color='red'>{this.state.error}</Segment>
                        }
                        <Form.Field>
                            <label>Nome</label>
                            <input
                                style={inputStyle}
                                placeholder='Nome...'
                                value={user.name}
                                onChange={this.onChange('user.name')} />
                        </Form.Field>
                        <Form.Field>
                            <label>Email</label>
                            <input
                                type='email'
                                style={inputStyle}
                                value={user.email}
                                placeholder='Email ...'
                                onChange={this.onChange('user.email')} />
                        </Form.Field>
                        <Form.Field>
                            <label>Role</label>
                            <Dropdown
                                onChange={(e, { value }) => this.onChangeValue( 'user.role', value ) }
                                fluid
                                search
                                selection
                                value={user.role}
                                options={[
                                    { key: 'admin', value: 'admin', text: 'Admin' },
                                    { key: 'user', value: 'user', text: 'Usuário' },
                                ]}
                            />
                        </Form.Field>
                        <Button primary onClick={this.onSave} >Salvar</Button>
                    </Form>
                }
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.users,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        load: id => dispatch(ActionsCreators.getUserRequest(id)),
        reset: () => dispatch(ActionsCreators.updateUserReset()),
        save: user => dispatch(ActionsCreators.updateUserRequest(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit)