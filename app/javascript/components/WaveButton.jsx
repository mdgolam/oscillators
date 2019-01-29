import React from 'react'

export default class WaveButton extends React.Component {
    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this)
    }


    handleClick() {
        const { value } = this.props
        this.props.handleClick(value)
    }

    render() {
        const { current, value } = this.props

        // here classes
        
        return(
            <div className="WaveButton" onClick={ this.handleClick }>
                { value }
            </div>
        )
    }
}