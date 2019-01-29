import React from 'react'

import WaveButton from 'components/WaveButton'
import Slider from 'components/Slider'
import Knob from 'components/Knob'
import ToggleSwitch from './ToggleSwitch';

import classnames from 'classnames'

export default class Oscillator extends React.Component {

    constructor(props) {
        super(props)

        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        let oscillator = audioContext.createOscillator();

        this.state = {
            audioContext: audioContext,
            oscillator: oscillator,
            playing: false
        }

        this.handlePlayPauseClick = this.handlePlayPauseClick.bind(this)
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
        const { playing } = this.props
        if (playing && !this.state.playing) {
            this.startOscillator()
        } else if (playing == false && this.state.playing) {
            this.stopOscillator()
        }

        this.changeFrequency()
        this.changeWave()
        this.changeDetune()
        console.log("update")
    }

    handlePlayPauseClick() {
        const { index, handlePlayPauseClick } = this.props
        handlePlayPauseClick(index)
    }

    // handlePlayClick() {
    //     this.startOscillator() // check
    //     this.props.handlePlayPauseClick(this.props.index) // check
    //     // console.log("hello from click")
    // }

    // handleStopClick() {
    //     this.stopOscillator()
    //     this.props.handlePlayPauseClick(this.props.index)
    // }
    
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

        console.log("startOscillator")
        this.setState({
            oscillator: oscillator,
            playing: true
        })
    }

    stopOscillator() {
        let { oscillator } = this.state
        oscillator.stop()

    }

    changeFrequency() {
        console.log("change F")
        const { frequency } = this.props
        const { audioContext, oscillator } = this.state
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
    }

    changeWave() {
        const { wave } = this.props
        console.log("change W", wave)
        const { oscillator } = this.state
        oscillator.type = wave
    }

    render() {
        const { title, wave, frequency, detune, playing } = this.props
        return (
            <div className="Oscillator">

                <h1>{ title }</h1>

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

                <Knob
                    min="-100"
                    max="100"
                />

                <Slider
                    min="0"
                    max="1000"
                    value={frequency}
                    handleValueChange={ this.handleFrequencyChange }
                    handleMouseUp={ this.handleMouseUp }
                />

                <div className="result">
                    { frequency }
                </div>
                <div className="result">
                    { wave }
                </div>
            </div>
        )
    }
}