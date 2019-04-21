import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import ActionCreators from '../../redux/actionCreators'
import {
    Table,
    Button,
    Segment
} from 'semantic-ui-react'

import Duration from './../components/Duration';
import Distance from './../components/Distance';
import DateString from './../components/DateString';

class Runs extends React.Component {

    componentDidMount() {
        this.props.load()
    }

    onRemove = id =>  {
        this.props.remove(id)
    }

    renderRun = (run, index, user) => {
        return (
            <Table.Row key={index} >
                <Table.Cell>{run.id}</Table.Cell>
                <Table.Cell>{run.name}</Table.Cell>
                <Table.Cell>{run['friendly_name']}</Table.Cell>
                <Table.Cell><Duration duration={run.duration} /></Table.Cell>
                <Table.Cell><Distance distance={run.distance} unit={user.unit} /></Table.Cell>
                <Table.Cell><DateString date={run.created} timezone={user.timezone} /></Table.Cell>
                <Table.Cell textAlign='center' >
                    <Button onClick={ () => this.onRemove(run.id)} basic color='red'>Remove</Button>
                </Table.Cell>
            </Table.Row>
        )
    }

    render() {
        const { runs, auth } = this.props
        return (
            <Fragment>
                <h1>Corridas</h1>
                <Table celled style={{ marginTop: '20px' }}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Id</Table.HeaderCell>
                            <Table.HeaderCell>User name</Table.HeaderCell>
                            <Table.HeaderCell>Friendly name</Table.HeaderCell>
                            <Table.HeaderCell>Duration</Table.HeaderCell>
                            <Table.HeaderCell>Distance</Table.HeaderCell>
                            <Table.HeaderCell>Created</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'  >Ações</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            runs.data.map((run, index) =>
                                this.renderRun(run, index, auth.user))
                        }
                    </Table.Body>
                </Table>
                { runs.data.length === 0  && <Segment color='blue'>Sem corridas.</Segment> }
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        runs: state.runs,
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        load: () => dispatch(ActionCreators.getRunsRequest(true)),
        remove: id => dispatch(ActionCreators.removeRunRequest(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Runs)