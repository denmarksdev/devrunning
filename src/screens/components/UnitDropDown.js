import React from 'react'
import { Dropdown } from 'semantic-ui-react'

export const DEFAULT_UNIT = 'metric'

const UnitDropDown = ({ unit, onChange, maxWidth, marginBottom }) => {
    return (
        <Dropdown
            style={{ maxWidth, marginBottom, unit }}
            fluid
            search
            selection
            value={unit}
            onChange={onChange}
            options={[
                { key: 'metric', value: 'metric', text: 'Métrico' },
                { key: 'imperial', value: 'imperial', text: 'Imperial (mi)' },
            ]}
        />
    )
}

UnitDropDown.defaultProps = {
    unit: DEFAULT_UNIT,
    onChange :() => { },
    marginBottom: '10px',
    maxWidth: '300px',
}

export default UnitDropDown