import React from 'react'
import $ from 'jquery'

import Oscillator from '../components/Oscillator';
import ToggleSwitch from '../components/ToggleSwitch';

export default class Oscillators extends React.Component {

    constructor(props) {
        super(props)

        let oscillators = []

        props.oscillators.map(oscillator => {
            oscillator.playing = false
            oscillators.push(oscillator)
        })

        this.state = {
            playing: false,
            oscillators: oscillators
        }

        this.handlePlayPauseClick = this.handlePlayPauseClick.bind(this)
        this.handlePlayOrStopAllClick = this.handlePlayOrStopAllClick.bind(this)
        this.handleFrequencyChange = this.handleFrequencyChange.bind(this)
        this.handleWaveChange = this.handleWaveChange.bind(this)
        this.isPlaying = this.isPlaying.bind(this)
        this.handleDetuneChange = this.handleDetuneChange.bind(this)
    }

    componentDidMount() {
        const { oscillators } = this.state
        this.setState({
            playing: this.isPlaying(oscillators)
        })   
    }

    isPlaying(oscillators) {
        let { playing } = false

        oscillators.map((oscillator, i) => {
            if (oscillator.playing) {
                playing = true
            }
        })

        return playing
    }

    handlePlayPauseClick(index) {
        // console.log("handlePlayPauseClick")
        let { oscillators, playing } = this.state

        oscillators.map((oscillator, i) => {
            if (index == i) {
                oscillator.playing = !oscillator.playing
            }
        })

        playing = this.isPlaying(oscillators)

        this.setState({
            oscillators: oscillators,
        })
    }

    handlePlayOrStopAllClick() {
        const { playing } = this.state
        let { oscillators } = this.state

        oscillators.map((oscillator, i) => {
            if (index == i) {
                oscillator.playing = !playing
            }
        })

        this.setState({
            playing: !playing,
            oscillators: oscillators
        })
    }

    handleWaveChange(index, value) {
        let { oscillators } = this.state
        oscillators.map((oscillator, i) => {
            if (index == i) {
                oscillator.wave = value
            }
        })
        this.setState({
            oscillators: oscillators
        })
        this.updateOscillator(index, "wave", value)
    }

    handleDetuneChange(index, value) {
        let { oscillators } = this.state
        oscillators.map((oscillator, i) => {
            if (index == i) {
                oscillator.detune = value
            }
        })
        this.setState({
            oscillators: oscillators
        })
        this.updateOscillator(index, "detune", value)
    }

    handleFrequencyChange(index, value) {
        let { oscillators } = this.state

        oscillators.map((oscillator, i) => {
            if (index == i) {
                oscillator.frequency = value
            }
        })
        this.setState({
            oscillators: oscillators
        })
        const frequency = this.state.oscillators[index].frequency
        this.updateOscillator(index, "frequency", frequency)
    }
    
    updateOscillator(index, paramName, value) {
        let { oscillators } = this.state

        oscillators.map((oscillator, i) => {
            if (index == i) {
                const { id } = oscillator

                $.ajax({
                    dataType: "json",
                    method: "POST",
                    url: "/oscillators/tune",
                    data: { id: id, param_name: paramName, value: value }
                })
                    .done(function () {
                        // console.log("success")
                    })
                    .fail(function (jqXHR, textStatus) {
                        console.log("fail", jqXHR, textStatus)
                    })
                    .always(function () {
                        // console.log("complete")
                    })
            }
        })

        this.setState({
            oscillators: oscillators
        })
    }


    render() {
        const { oscillators, playing } = this.state
        let oscillatorElements = []

        oscillators.map((oscillator, i) => {
            oscillatorElements.push(
                <Oscillator
                    {...oscillator}
                    handleMouseUp={ this.handleMouseUp }
                    handlePlayPauseClick={ this.handlePlayPauseClick }
                    handleFrequencyChange={ this.handleFrequencyChange }
                    handleWaveChange={ this.handleWaveChange }
                    handleDetuneChange={ this.handleDetuneChange }
                    index = { i }
                    key = { i }
                />   
            )
        })

        return (
            <div>
                {/* <ToggleSwitch
                    name="play"
                    value={ playing }
                    handleToggleClick={this.handlePlayPauseClick} /> */}
                    
                <div className="Oscillators">
                    { oscillatorElements }
                </div>
            </div>
        )
    }
}