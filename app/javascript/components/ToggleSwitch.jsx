import React from 'react'
import classnames from 'classnames'

export default class ToggleSwitch extends React.Component {
    constructor(props) {
        super(props)
    }

    rencerSwitchOffButton

    render() {
        const { name, value, handleToggleCLick } = this.props.value
        const classes = classnames({
            "ToggleSwitch": true,
            "switchOn": !value,
            "switchOff": value,
            ['${ name }']: true
        })

        const { value } = this.props
        return (
            <div className={classes} onClick={ handleToggleCLick } ></div>
        )
    }
}