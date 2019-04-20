import React, { Fragment } from 'react';
import { connect } from 'react-redux'
import ActionsCreators from '../../redux/actionCreators'
import { BaseComponent } from './../components/BaseComponent';
import InputMoment from 'input-moment'
import 'input-moment/dist/input-moment.css'
import moment from 'moment'
import momentTz from 'moment-timezone'


import {
    Button,
    Form,
    Segment

} from 'semantic-ui-react'

const inputStyle = {
    maxWidth: '300px',
    marginBottom: '10px'
}

class CreateRun extends BaseComponent {

    state = {
        error: '',
        run: {
            friendly_name: '',
            duration: 0,
            distance: 0,
            created: moment()
        },
    }

    componentDidMount() {

    }

    onSave = () => {
        const run = this.state.run;
        if (this.props.auth.user.unit !== 'metric')
            run.distance = (run.distance * 1.60934)

        const dateTimeZone = moment.tz(run.created, this.props.auth.user.timezone)
        const d2  = dateTimeZone
            .clone()
            .utc()
            .format('YYYY-MM-DD H:mm:ss')
        
        run.created = d2    

        this.props.create(run)
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
                        <h1>Criar corrida</h1>
                        {
                            this.state.error &&
                            <Segment color='red'>{this.state.error}</Segment>
                        }
                        <Form.Field>
                            <label>Nome</label>
                            <input
                                style={inputStyle}
                                placeholder='Nome...'
                                onChange={this.onChange('run.friendly_name')} />
                        </Form.Field>
                        <Form.Field>
                            <label>Duraçao em segundos</label>
                            <input
                                type='number'
                                style={inputStyle}
                                placeholder='segundos...'
                                onChange={this.onChange('run.duration')} />
                        </Form.Field>
                        <Form.Field>
                            <label>Distância ({this.props.auth.user.unit === 'metric' ? 'Km' : 'mi'}) </label>
                            <input
                                type='number'
                                style={inputStyle}
                                placeholder='distância...'
                                onChange={this.onChange('run.distance')} />
                        </Form.Field>
                        <Form.Field>
                            <label>Criação</label>
                            <input type='text' value={this.state.run.created.format('DD/MM/YYYY  H:mm:ss')} />
                            <InputMoment
                                moment={this.state.run.created}
                                onChange={val => {
                                    this.setState({ run: { created: val } })
                                }}
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
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        save: user => dispatch(ActionsCreators.updateProfileRequest(user)),
        create: run => dispatch(ActionsCreators.createRunRequest(run))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRun)