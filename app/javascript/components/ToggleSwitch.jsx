import React from 'react'
import classnames from 'classnames'

export default class ToggleSwitch extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { name, value, handleToggleClick } = this.props
        const classes = classnames({
            "ToggleSwitch": true,
            "switchOn": !value,
            "switchOff": value,
            [`${name}`]: true
        })

        return (
            <div
                className={ classes }
                onClick={ handleToggleClick }
            />
        )
    }
}