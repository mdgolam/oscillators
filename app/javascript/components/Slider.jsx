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
                left: 0
            }
        }

        this.slideArea = React.createRef()

        this.handleMouseMove = this.handleMouseMove.bind(this)
        this.handleMouseDown = this.handleMouseDown.bind(this)
        this.handleMouseUp = this.handleMouseUp.bind(this)

        this.moveThumb = this.moveThumb.bind(this)
        this.calculateLeft = this.calculateLeft.bind(this)
        this.calculateValue = this.calculateValue.bind(this)
    }

    componentDidMount() {
        const { x, width } = this.slideArea.current.getBoundingClientRect()
    
        this.setState({
            area: {
                left: x,
                right: x + width,
                width: width
            },
           thumb: {
               left: this.calculateLeft(width)
           }
        })        
    
        document.addEventListener("mouseup", this.handleMouseUp)
        document.addEventListener("mousemove", this.handleMouseMove)
    }

    // componentDidUpdate() {

    // }

    handleDragOver(e) {
        e.preventDefault()
    }

    handleDrop() {
        console.log("Drop")
    }

    handleDragStart() {
        console.log("Started")
    }

    handleMouseDown(e) {
        e.preventDefault()
        
        this.setState({
            mouseDown: true
        })
    }
    
    handleMouseUp(e) {
        e.preventDefault()

        this.setState({
            mouseDown: false
        })
    }

    handleMouseMove(e) {
        const { MouseDown } = this.state
        
        if (MouseDown) {
            this.moveThumb(e.screenX)
        }
    }

    moveThumb(screenX) {
        const areaLeft = this.state.area.left
        const areaRight = this.state.area.right
        const thumbLeft = screenX - areaLeft

        if (thumbLeft >= 0 && screenX <= areaRight) {
            const value = this.calculateValue(thumbLeft)
            this.props.handleValueChange(value)

            this.setState({
                thumb: {
                    left: thumbLeft
                }
            })
        }
    }

    calculateLeft(width) {
        const { min, max } = this.props
        const { value } = this.props

        const range = max - min
        const coef = range / width

        const left = value / coef

        return left
    }

    calculateValue(thumbLeft) {
        const { min, max } = this.props
        const { width } = this.state.area
        
        const range = max - min
        const coef = range / width

        const value = thumbLeft * coef


        return Math.round(value)
    }


    handleClick() {
        const { value } = this.props
        this.props.handleClick(value)
    }

    render() {
        const { left } = this.state.thumb

        const style = {
            transform: "translateX(${left}px)"
        }

        return (
            <div className="Slider" ref={this.slideArea} onClick={this.handleClick} onDragOver={ this.handleDragOver} onDrop= { this.handleDrop } >
                <div className="thumb" style={style} onMouseDown={this.handleMouseDown} onMouseMove={ this.handleMouseMove } />
            </div>
        )
    }
}