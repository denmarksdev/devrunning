import React from 'react'

export class BaseComponent extends React.Component {

    onChange = name => event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setPropertyByPath(this.state, name, value)
    }

    setPropertyByPath = (state, path, value) => {
        const parts = path.split('.');
        if (parts.length > 1) {
            for (let i = 0; i < parts.length - 1; i++) {
                if (!state[parts[i]]) state[parts[i]] = {};
                state = state[parts[i]];
            }
        }
        if (parts.length > 1){
            state[parts[parts.length - 1]] = value;
            this.setState({ [parts[0]]: state })
        }else {
            this.setState({ [parts[0]]: value })
        }
    }
}