import React from 'react'

export default class Slider extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            mouseDown: false,
            area: {
                left: 0,
                rigth: 0,
                width: 0
            },
            thumb: {
                position: 0
            }
        }

        this.slideArea = React.createRef()

        this.handleMouseMove = this.handleMouseMove.bind(this)
        this.handleMouseDown = this.handleMouseDown.bind(this)
        this.handleMouseUp = this.handleMouseUp.bind(this)
        this.handleClick = this.handleClick.bind(this)

        this.moveThumb = this.moveThumb.bind(this)
        this.calculatePosition = this.calculatePosition.bind(this)
        this.calculateValue = this.calculateValue.bind(this)
    }

    componentDidMount() {
        const { x, width } = this.slideArea.current.getBoundingClientRect()
        console.log(x, width, " x, width initializing")
        this.setState({
            area: {
                left: x,
                right: x + width,
                width: width
            },
           thumb: {
               position: this.calculatePosition()
           }
        })        
    
        document.addEventListener("mouseup", this.handleMouseUp)
        document.addEventListener("mousemove", this.handleMouseMove)
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
        console.log("mouse down")
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
            console.log("mouse move")
            console.log(e.movementX, " movementX")
            this.moveThumb(e.movementX)
        }
    }

    moveThumb(movementX) {
        const minPosition = this.state.area.left
        const maxPosition = this.state.area.right
        const thumbPosition = this.state.thumb.position

        const newPosition = thumbPosition + movementX

        console.log("moveThumb")
        console.log("new position", newPosition)
        
        if (minPosition <= newPosition && newPosition <= maxPosition ){
            const value = this.calculateValue(newPosition)
            this.props.handleValueChange(value)

            this.setState({
                thumb: {
                    position: this.calculatePosition()
                }
            })
        }
    }

    calculatePosition() {
        const { min, max } = this.props // min and max of Frequency
        const { value } = this.props  // value of Frequency now, hz
        

        const range = max - min // range btw min and max (frequency) in hz
        const { width } = this.state.area // width of our slider in px
        
        const position = (value * width) / range
        console.log(width, " width")
        console.log(value, " value")
        console.log(position, " position")
        return position
    }

    calculateValue(thumbPosition) {
        console.log("calculate")
        const { min, max } = this.props
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
        console.log(position, "position bitch")

        const style = {
            transform: `translateX(${ position }px)`
        }

        return (
            <React.Fragment>
            <div className="Slider" ref={ this.slideArea } onClick={ this.handleClick } onDragOver={ this.handleDragOver} onDrop= { this.handleDrop } >
                <div className="thumb" style={ style } onMouseDown={ this.handleMouseDown } onMouseMove={ this.handleMouseMove } />
            </div>
            </React.Fragment>
        )
    }
}