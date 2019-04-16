import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ActionCreators from '../../redux/actionCreators'
import {
    Table,
    Button
} from 'semantic-ui-react'

import Duration from './../components/Duration';
import Distance from './../components/Distance';
import DateString from './../components/DateString';

class Runs extends React.Component {

    componentDidMount() {
        this.props.load()
    }

    renderRun = (run, index, user) => {
        return (
            <Table.Row key={index} >
                <Table.Cell>{run.id}</Table.Cell>
                <Table.Cell>{run['friendly_name']}</Table.Cell>
                <Table.Cell><Duration duration={run.duration} /></Table.Cell>
                <Table.Cell><Distance distance={run.distance} unit={user.unit} /></Table.Cell>
                <Table.Cell><DateString date={run.created} timezone={user.timezone} /></Table.Cell>
            </Table.Row>
        )
    }

    render() {
        const { runs, auth } = this.props
        return (
            <Fragment>
                <h1>Corridas</h1>
                <Button primary  as={Link} to='create-run' >Criar</Button>
                <Table celled style={{ marginTop: '20px' }}>
                    <Table.Header>
                        <Table.HeaderCell>Id</Table.HeaderCell>
                        <Table.HeaderCell>Friendly name</Table.HeaderCell>
                        <Table.HeaderCell>Duration</Table.HeaderCell>
                        <Table.HeaderCell>Distance</Table.HeaderCell>
                        <Table.HeaderCell>Created</Table.HeaderCell>
                    </Table.Header>
                    <Table.Body>
                        {
                            runs.data.map((run, index) =>
                                this.renderRun(run, index, auth.user))
                        }
                    </Table.Body>
                </Table>
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
        load: () => dispatch(ActionCreators.getRunsRequest()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Runs)