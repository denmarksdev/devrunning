import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import {
    Button,
    Dropdown,
    Form,
    Segment
} from 'semantic-ui-react'

import timezones from 'moment-timezone/data/meta/latest.json'
import ActionsCreators from '../../redux/actionCreators'

const dropDownStyle = {
    marginBottom: '10px',
    maxWidth: '300px'
}

class MyAccount extends React.Component {
    state = {
        zones: [],
        unit: '',
        timezone: ''
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.unit) return null
        return {
            unit: nextProps.auth.user.unit,
            timezone: nextProps.auth.user.timezone
        }
    }

    componentDidMount() {
        const {
            auth,
            reset
        }  = this.props

        reset()

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
            <Fragment>
                <h1>Minha conta</h1>
                {
                    this.props.auth.isSaved &&
                    <Segment color='green'> Configuração alterada com sucesso.</Segment>
                }
                {
                    !this.props.auth.isSaved &&
                    <Form>
                        <Form.Field>
                            <Dropdown
                                style={dropDownStyle}
                                fluid
                                search
                                selection
                                value={unit}
                                onChange={(e, { value }) => {
                                    this.setState({ unit: value })
                                }}
                                options={[
                                    { key: 'metric', value: 'metric', text: 'Métrico' },
                                    { key: 'imperial', value: 'imperial', text: 'Imperial (mi)' },
                                ]}
                            />
                            <Dropdown
                                style={dropDownStyle}
                                fluid
                                search
                                selection
                                value={timezone}
                                onChange={(e, { value }) => this.setState({ timezone: value })}
                                options={zones} />

                            <Button style={{ maxWidth: '100px' }}
                                variant='primary'
                                onClick={this.onClick}>
                                Save
                            </Button>
                        </Form.Field>
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
        reset: () => dispatch( ActionsCreators.updateProfileReset())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount)