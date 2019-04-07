import React from 'react'
import moment from 'moment-timezone'

const DateString = ({ date , timezone }) => {
    if (!date) return  <span></span>

    const dateTimeZone = moment.tz(date, timezone)
    return <span>{ dateTimeZone.format("DD/MM/YYYY [ás] H:mm:ss") }</span>
}

export default DateString