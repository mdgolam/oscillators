import React from 'react'

export default class Knob extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            mouseDown: false,
            value: 0, // db number
            screenY: 0,
            deg: -90 // depends on value
        }

        this.handleMouseDown = this.handleMouseDown.bind(this)
        this.handleMouseUp = this.handleMouseUp.bind(this)
        this.moveKnob = this.moveKnob.bind(this)
        this.handleMouseMove = this.handleMouseMove.bind(this)
        this.calculateDeg = this.calculateDeg.bind(this)
    }

    componentDidMount() {
        document.addEventListener("mouseup", this.handleMouseUp)
        document.addEventListener("mousemove", this.handleMouseMove)
    }

    handleMouseDown(e) {
        console.log("Mouse Down")
        e.preventDefault()

        this.setState({
            screenY: e.screenY,
            mouseDown: true,
        })
    }

    handleMouseUp() {
        if (this.state.mouseDown) {
            this.setState({
                mouseDown: false
            })
        }
    }

    handleMouseMove(e) {
        const { mouseDown } = this.state

        if (mouseDown) {
            this.moveKnob(e.screenY)
        }
        
    }

    moveKnob(screenY) {
        const oldScreenY = this.state.screenY
        const { deg } = this.state
        const { min } = parseInt(this.props.min)
        const { max } = parseInt(this.props.max)
        let { value } = this.state
        const difference = screenY - oldScreenY

        value += difference

        if (value < min) {
            value = min
        } else if (value > max) {
            value = max
        }

        this.setState({
            screenY: screenY,
            deg: deg,
            value: this.calculateDeg(value)

        })
    }

    calculateDeg(value) {
        const { max } = this.props
        const coef = 120 / max
        const deg = value * coef

        return 120
    }

    render() {
        const { deg } = this.state

        const styleDiv = {
            transform: 'rotate((${deg})deg)'
            // transform: "rotate(${deg}deg)",
        };

        return (
            <div className="Knob" style={styleDiv } onMouseDown= { this.handleMouseDown } onMouseMove={ this.handleMouseMove } />
        )
    }
}