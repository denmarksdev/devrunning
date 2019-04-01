import React from 'react'

const KILOMETRE_MILE = 0.621371

const Distance = ({ distance, metric }) => {
    let distanceStr = ''
    if (!distance) distance = 0
    
    if (metric === 'metric') {
        distanceStr = distance + 'km'
    } else {
        const distanceMi = distance * KILOMETRE_MILE
        distanceStr = distanceMi.toFixed(2)  + 'mi'
    }

    return <span>{distanceStr}</span>
}

Distance.defaultProps = {
    metric: 'metric'
}

export default Distance