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
        this.changeDetune = this.changeDetune.bind(this)
        this.handleFrequencyChange = this.handleFrequencyChange.bind(this)
        this.handleDetuneChange = this.handleDetuneChange.bind(this)
        this.handleWaveChange = this.handleWaveChange.bind(this)
    }

    componentDidMount() {
        // console.log("mount")
    }

    componentDidUpdate() {
        const { playing } = this.props
        if (playing && !this.state.playing) {
            this.startOscillator()
        } else if (playing == false && this.state.playing) {
            this.stopOscillator()
        }

        console.log("update")
        this.changeFrequency()
        this.changeWave()
        this.changeDetune()
    }

    handlePlayPauseClick() {
        const { index, handlePlayPauseClick } = this.props
        handlePlayPauseClick(index)
    }
    
    handleFrequencyChange(value) {
        const { index } = this.props
        this.props.handleFrequencyChange(index, value)
    }

    handleWaveChange(value) {
        const { index } = this.props
        this.props.handleWaveChange(index, value)
    }

    handleDetuneChange(value) {
        const { index } = this.props
        this.props.handleDetuneChange(index, value)
    }

    handleUpCLick() {
        this.props.handleUpCLick(this.props.index)
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
        // console.log("change F")
        const { frequency } = this.props
        const { audioContext, oscillator } = this.state
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
    }

    changeWave() {
        const { wave } = this.props
        // console.log("change W", wave)
        const { oscillator } = this.state
        oscillator.type = wave
    }

    changeDetune() {
        // console.log("changeDetune")
        const { detune } = this.props
        const { audioContext, oscillator } = this.state
        oscillator.detune.setValueAtTime(detune, audioContext.currentTime)
    }

    render() {
        const { title, wave, frequency, detune } = this.props
        // console.log(detune," detune")
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
                    value={ detune }
                    handleValueChange={ this.handleDetuneChange }
                    // handleValueChange → this.props.handleValueChange in Knob
                />

                <Slider
                    min="0"
                    max="1000"
                    value={ frequency }
                    handleValueChange={ this.handleFrequencyChange }
                    // handleMouseUp={ this.handleMouseUp }
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