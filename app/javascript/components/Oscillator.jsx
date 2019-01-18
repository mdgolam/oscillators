import React from 'react'

export default class Oscillator extends React.Component {

    constructor(props) {
        super(props)

        this.handleDownCLick = this.handleDownCLick.bind(this)
        this.handleUpCLick = this.handleUpCLick.bind(this)
        // this.handleResetCLick = this.handleResetCLick.bind(this)
    }
    
    handleUpCLick() {
        this.props.handleUpCLick(this.props.index)
    }

    // handleResetCLick() {
    //     this.setState({
    //         result: 0
    //     })
    // }

    handleDownCLick() {
        this.props.handleDownCLick(this.props.index)
    }

    render() {
        const { title, frequency } = this.props
        return (
            <div className="Oscillator">
                <h1>{ title }</h1>
                <div className="up" onClick={ this.handleUpCLick }>+</div>

                <div className="result">
                    {frequency }
                </div>

                <div className="down" onClick={ this.handleDownCLick }>–</div>

                <div className="reset" onClick={this.handleResetCLick}>reset</div>
            </div>
        )
    }
}