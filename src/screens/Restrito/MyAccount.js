import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import ActionsCreators from '../../redux/actionCreators'

import {
    Button,
    Dropdown,
    Form,
    Segment
} from 'semantic-ui-react'
import TimeZoneDropDown from './../components/TimeZoneDropDown';
import UnitDropDown from '../components/UnitDropDown';

class MyAccount extends React.Component {
    state = {
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
        } = this.props

        reset()

        this.setState({
            unit: auth.user.unit,
            timezone: auth.user.timezone,
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
                            <UnitDropDown
                               value={unit}
                                onChange={(e, { value }) => {
                                    this.setState({ unit: value })
                                }} />
                            <TimeZoneDropDown
                                timeZone={timezone}
                                onChange={(e, { value }) => this.setState({ timezone: value })} />
                            <Button style={{ maxWidth: '100px' }}
                                variant='primary'
                                onClick={this.onClick}>
                                Salvar
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
        reset: () => dispatch(ActionsCreators.updateProfileReset())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAccount)