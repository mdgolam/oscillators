import React from 'react'

import WaveButton from 'components/WaveButton'
import Slider from 'components/Slider'

export default class Oscillator extends React.Component {

    constructor(props) {
        super(props)

        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        let oscillator = audioContext.createOscillator();

        this.state = {
            audioContext: audioContext,
            oscillator: oscillator
        }

        this.handlePlayClick = this.handlePlayClick.bind(this)
        this.handleStopClick = this.handleStopClick.bind(this)
        this.changeFrequency = this.changeFrequency.bind(this)
        this.changeWave = this.changeWave.bind(this)
        this.handleFrequencyChange = this.handleFrequencyChange.bind(this)
        this.handleWaveChange = this.handleWaveChange.bind(this)
        this.handleMouseUp = this.handleMouseUp.bind(this)
    }

    componentDidMount() {
        console.log("mount")
    }

    componentDidUpdate() {
        // this.changeFrequency()
        // this.changeWave()
        console.log("update")
    }

    handlePlayClick() {
        this.startOscillator() // check
        // this.props.handlePlayPauseClick(this.props.index) // check
        // console.log("hello from click")
    }

    handleStopClick() {
        this.stopOscillator()
        this.props.handlePlayPauseClick(this.props.index)
    }
    
    handleFrequencyChange(value) {
        const { index } = this.props
        this.props.handleFrequencyChange(index, value)
    }

    handleWaveChange(value) {
        const { index } = this.props
        this.props.handleWaveChange(index, value)
    }

    handleUpCLick() {
        this.props.handleUpCLick(this.props.index)
    }

    handleMouseUp() {
        const { index } = this.props
        this.props.handleMouseUp(index)
    }

    startOscillator() {
        const { frequency } = this.props
        const { audioContext } = this.state
        let { oscillator } = this.state

        oscillator = audioContext.createOscillator()
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime); // value in hertz
        oscillator.connect(audioContext.destination);
        oscillator.start()

        console.log("HI")
        this.setState({
            oscillator: oscillator
        })
    }

    stopOscillator() {
        let { oscillator } = this.state
        oscillator.stop()
    }

    changeFrequency() {
        const { frequency } = this.props
        const { audioContext, oscillator } = this.state
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
    }

    changeWave() {
        const { wave } = this.props
        const { audioContext, oscillator } = this.state
        oscillator.type = wave
    }

    renderPlayButton() {
        return <div className="play" onClick={this.handlePlayClick()} />
        // return <div></div>
    }

    renderStopButton() {
        return <div className="stop" onClick={this.handleStopClick() } />
    }

    render() {
        const { title, wave, frequency, playing } = this.props
        // console.log("Hi2")
        return (
            <div className="Oscillator">

                <h1>{ title }</h1>

                {/* { playing ? this.renderStopButton() : this.renderPlayButton() } */}
                
                {this.renderPlayButton()}

                <WaveButton
                    current={wave}
                    value="sine"
                    handleClick={this.handleWaveChange}
                />

                <WaveButton
                    current={wave}
                    value="square"
                    handleClick={this.handleWaveChange}
                />

                <WaveButton
                    current= { wave }
                    value="sawtooth"
                    handleClick= { this.handleWaveChange }
                />

                <WaveButton
                    current={ wave }
                    value="triangle"
                    handleClick={this.handleWaveChange}
                />

                <Slider
                    min="0"
                    max="1000"
                    value={ frequency }
                    handleValueChange={ this.handleFrequencyChange }
                    handleMouseUp={ this.handleMouseUp }
                />

                <div className="result">
                    { frequency }
                </div>
            </div>
        )
    }
}