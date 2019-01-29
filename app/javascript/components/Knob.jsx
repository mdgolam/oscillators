import React from 'react'

export default class Knob extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            mouseDown: false,
            value: 0, // db number
            deg: 90, // depends on value
            screenY: 0
        }

        this.handleMouseDown = this.handleMouseDown.bind(this)
        this.handleMouseUp = this.handleMouseUp.bind(this)
        this.moveKnob = this.moveKnob.bind(this)
        this.handleMouseMove = this.handleMouseMove.bind(this)
        this.calculateDeg = this.calculateDeg.bind(this)
    }

    componentDidMount() {
        const newValue = this.props.value
        // console.log(newValue, " — new value")
        this.setState({
            value: newValue,
            deg: 90 + this.calculateDeg(newValue)
        })
        document.addEventListener("mouseup", this.handleMouseUp)
        document.addEventListener("mousemove", this.handleMouseMove)
    }

    handleMouseDown(e) {
        e.preventDefault()
        this.setState({
            mouseDown: true,
            screenY: e.screenY
        })
    }

    handleMouseMove(e) {
        const { mouseDown } = this.state
        if (mouseDown) {
            this.moveKnob(e.screenY)
        }   
    }

    handleMouseUp() {
        if (this.state.mouseDown) {
            this.setState({
                mouseDown: false
            })
        }
    }

    moveKnob(screenY) {
        const oldScreenY = this.state.screenY
        const min = parseInt(this.props.min)
        const max = parseInt(this.props.max)
        const difference = oldScreenY - screenY
        let { value } = this.state
        
        value += difference

        // console.log("move",difference)

        if (value < min) {
            // console.log(value,min, "min")
            value = min
        } else if (value > max) {
            // console.log(value, max, "max")
            value = max
        } else {
            // console.log(value, max, min)
        }

        this.setState({
            screenY: screenY,
            value: value,
            deg: 90 + this.calculateDeg(value)
        })
        this.props.handleValueChange(value)
    }

    calculateDeg(value) {
        const { max } = this.props
        const coef = 120 / max
        const deg = value * coef
        return deg
    }

    render() {
        const { deg } = this.state
        const { value } = this.props

        const styleDiv = {
            transform: `rotate(${deg}deg)`
        };

        return (
            <React.Fragment>
            <div className="Knob" style={ styleDiv } onMouseDown={ this.handleMouseDown } onMouseMove={ this.handleMouseMove }/>
            <p>detune: { value }</p>
            </React.Fragment>
        )
    }
}