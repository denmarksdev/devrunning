import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ActionCreators from '../../redux/actionCreators'
import {
    Table,
    Button,
    Segment
} from 'semantic-ui-react'

class Users extends React.Component {

    componentDidMount() {
        this.props.load()
        this.props.reset()
    }

    onRemove = id => {
        this.props.remove(id)
    }

    renderUser = (user, index) => {
        return (
            <Table.Row key={index} >
                <Table.Cell>{user.id}</Table.Cell>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell textAlign='center'  >
                    <Button as={Link} to={`users/${user.id}/edit`} basic color='blue'>Alterar</Button>
                    <Button onClick={() => this.onRemove(user.id)} basic color='red'>Remove</Button>
                </Table.Cell>
            </Table.Row>
        )
    }

    render() {
        const { users } = this.props
        return (
            <Fragment>
                <h1>Usuários</h1>
                <Table celled style={{ marginTop: '20px' }}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Id</Table.HeaderCell>
                            <Table.HeaderCell>User name</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center' >Ações</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            Array.isArray(users.data)&&
                            users.data.map((user, index) =>
                                this.renderUser(user, index))
                        }
                    </Table.Body>
                </Table>
                {users.data.length === 0 && <Segment color='blue'>Sem usuários.</Segment>}
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.users,
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        load: () => dispatch(ActionCreators.getUsersRequest()),
        remove: id => dispatch(ActionCreators.removeUserRequest(id)),
        reset: () => dispatch(ActionCreators.updateUserReset()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)