import React from 'react'

const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let oscillator = audioContext.createOscillator();

export default class Oscillator extends React.Component {

    constructor(props) {
        super(props)

        this.handleDownCLick = this.handleDownCLick.bind(this)
        this.handleUpCLick = this.handleUpCLick.bind(this)
        this.handlePlayClick = this.handlePlayClick.bind(this)
    }

    componentDidMount() {
    }

    componentDidUpdate() {
        // const { play } = this.props

        // if (play) {
        //     oscillator.connect(audioContext.destination)
        //     oscillator.start()
        // } else {
        //     oscillator.stop()
        // }
    }
    
    handleUpCLick() {
        this.props.handleUpCLick(this.props.index)
    }

    handleResetCLick() {
        this.props.handleResetCLick(this.props.index)
    }

    handleDownCLick() {
        this.props.handleDownCLick(this.props.index)
    }

    startOscillator() {
        const { frequency } = this.props

        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime); // value in hertz
        oscillator.connect(audioContext.destination);

        oscillator.start()
    }

    handlePlayClick() {
        this.connectOscillator()
        this.props.handlePlayClick(this.props.index)
    }

    render() {
        const { title, frequency } = this.props
        return (
            <div className="Oscillator">
                <h1>{ title }</h1>

                <div className="play" onClick={this.handlePlayClick}/>

                <div className="up" onClick={ this.handleUpCLick }>+</div>

                <div className="result">
                    { frequency }
                </div>

                <div className="down" onClick={ this.handleDownCLick }>–</div>

                <div className="reset" onClick={this.handleResetCLick}>reset</div>
            </div>
        )
    }
}