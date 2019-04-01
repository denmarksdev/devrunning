import React from 'react'
import moment from 'moment-timezone'

const DateString = ({ date, timezone }) => {
    if (!date) return  <span></span>

    const date1 = moment.tz(date, timezone)
    return <span>{ date1.format("DD/MM/YYYY [ás] H:mm:ss") }</span>
}

export default DateString