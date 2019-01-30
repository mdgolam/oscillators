import React from 'react'

export default class Slider extends React.Component {
    constructor(props) {
        super(props)

        this.slideArea = React.createRef()

        this.handleMouseMove = this.handleMouseMove.bind(this)
        this.handleMouseDown = this.handleMouseDown.bind(this)
        this.handleMouseUp = this.handleMouseUp.bind(this)
        this.handleClick = this.handleClick.bind(this)

        this.moveThumb = this.moveThumb.bind(this)
        this.calculatePosition = this.convertFrequencyToPosition.bind(this)
        this.calculateValue = this.convertPositionToFrequency.bind(this)
        
        this.state = {
            mouseDown: false,
            area: {
                left: null,
                rigth: null,
                width: null
            },
            thumb: {
                position: null
            }
        }

    }

    componentDidMount() {
        const { x, width } = this.slideArea.current.getBoundingClientRect()
        console.log(x, width, " x, width initializing")
        this.setState({
            mouseDown: false,
            area: {
                left: x,
                right: x + width,
                width: width
            },
           thumb: {
               position: this.convertFrequencyToPosition()
           }
        })        

        document.addEventListener("mousemove", this.handleMouseMove)
        document.addEventListener("mouseup", this.handleMouseUp)
    }

    handleDragOver(e) {
        e.preventDefault()
    }

    handleDrop() {
        console.log("drop")
    }

    handleDragStart() {
        console.log("started")
    }

    handleMouseDown(e) {
        e.preventDefault()
        // console.log("mouse down")
        this.setState({
            mouseDown: true
        })
    }
    
    handleMouseUp(e) {
        if (this.state.mouseDown) {
            this.setState({
                mouseDown: false
            })
        }
    }

    handleMouseMove(e) {
        const { mouseDown } = this.state
        if (mouseDown) {
            // console.log("mouse move")
            // console.log(e.movementX, " movementX")
            this.moveThumb(e.movementX)
        }
    }

    moveThumb(movementX) {
        const minPosition = 0
        const maxPosition = this.state.area.width
        const thumbPosition = this.state.thumb.position

        let newPosition = thumbPosition + movementX
        if (minPosition >= newPosition) {
            newPosition = minPosition
        } else if (newPosition >= maxPosition) {
            newPosition = maxPosition
        }

        if (newPosition != thumbPosition) {
            const value = this.convertPositionToFrequency(newPosition)
            this.props.handleValueChange(value)
    
            this.setState({
                thumb: {
                    position: newPosition
                }
            })
        }

    }

    convertFrequencyToPosition() {
        const { min, max } = this.props // min and max of Frequency
        const { value } = this.props  // value of Frequency now, hz
        

        const range = max - min // range btw min and max (frequency) in hz
        const { width } = this.slideArea.current.getBoundingClientRect()
        
        const position = (value * width) / range
        console.log(width, " width convertFrequencyToPosition")
        console.log(value, " value")
        return position
    }

    convertPositionToFrequency(thumbPosition) {
        console.log("calculate")
        const { min, max } = this.props
        console.log(min, max, "min max")
        const { width } = this.state.area
        
        const range = max - min
        const coef = range / width

        const value = thumbPosition * coef

        return Math.round(value)
    }


    handleClick() {
        const { value } = this.props
        this.props.handleValueChange(value)
    }

    render() {
        const { position } = this.state.thumb
        // console.log(position, "render position bitch")

        const style = {
            transform: `translateX(${ position }px)`
        }

        return (
            <React.Fragment>
            <div className="Slider" ref={ this.slideArea } onClick={ this.handleClick } onDragOver={ this.handleDragOver} onDrop= { this.handleDrop } >
                <div className="thumb" style={ style } onMouseDown={ this.handleMouseDown } onMouseMove={ this.handleMouseMove } />
            </div>
                {/* <div>position { position }</div>
                <div>width {this.state.area.width}</div>
                <div>left {this.state.area.left}</div>

                <div>frequency { this.props.value }</div>
                <div>min { this.props.min}</div>
                <div>max {this.props.max}</div> */}
            </React.Fragment>
        )
    }
}