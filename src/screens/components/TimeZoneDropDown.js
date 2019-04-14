import React from 'react'
import { Dropdown } from 'semantic-ui-react'

import timezones from 'moment-timezone/data/meta/latest.json'

export const DEFAULT_TIME_ZONE = 'America/Sao_Paulo'

class TimeZoneDropDown extends React.Component {

    state = {
        zones: []
    }

    componentDidMount() {
        let zones = []
        Object.keys(timezones.zones).sort().forEach(key =>
            zones.push({
                key: key,
                value: key,
                text: key
            })
        )
        this.setState({ zones })
    }

    render() {
        const { timeZone, onChange, marginBottom, maxWidth } = this.props
        return (
            <Dropdown
                style={{ marginBottom, maxWidth }}
                fluid
                search
                selection
                value={timeZone}
                onChange={onChange}
                options={this.state.zones} />
        )
    }
}

TimeZoneDropDown.defaultProps = {
    timeZone: DEFAULT_TIME_ZONE,
    onChange : () => { },
    marginBottom: '10px',
    maxWidth: '300px',
}


export default TimeZoneDropDown