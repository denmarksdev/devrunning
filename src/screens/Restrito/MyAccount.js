import React from 'react';
import { connect } from 'react-redux'
import {
    Button,
    Dropdown
} from 'semantic-ui-react'

import timezones from 'moment-timezone/data/meta/latest.json'
import ActionsCreators from '../../redux/actionCreators'

class MyAccount extends React.Component {
    state = {
        zones: [],
        unit:'',
        timezone:''
    }

    static getDerivedStateFromProps(nextProps, prevState) {
       if (prevState.unit) return null
        return {
            unit:  nextProps.auth.user.unit,
            timezone: nextProps.auth.user.timezone
        }
    }

    componentDidMount() {
        const auth = this.props.auth

        let zones = []
        Object.keys(timezones.zones).sort().forEach(key =>
            zones.push({
                key: key,
                value: key,
                text: key
            })
        )

        this.setState({
            unit: auth.user.unit,
            timezone: auth.user.timezone,
            zones
        })
    }

    onClick = () => {
        this.props.save({
            unit: this.state.unit,
            timezone: this.state.timezone,
            id: this.props.auth.user.id
        })
    }

    render() {
        let {
            zones,
            timezone,
            unit
        } = this.state

        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h1>Mina conta</h1>
                <Dropdown
                    fluid
                    search
                    selection
                    value={ unit }
                    onChange={(e, { value }) => {
                        this.setState({ unit: value })
                    } }
                    options={[
                        { key: 'metric', value: 'metric', text: 'Métrico' },
                        { key: 'imperial', value: 'imperial', text: 'Imperial (mi)' },
                    ]}
                />
                <Dropdown
                    fluid
                    search
                    selection
                    value={ timezone }
                    onChange={(e, { value }) => this.setState({ timezone: value })}
                    options={zones}
                />
                <Button style={{ maxWidth: '100px' }}
                    variant='primary'
                    onClick={this.onClick}>
                    Save
                 </Button>

            </div>
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
        // load: () => dispatch(ActionCreators.getRunsRequest()),
        save: user => dispatch(ActionsCreators.updateProfileRequest(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount)