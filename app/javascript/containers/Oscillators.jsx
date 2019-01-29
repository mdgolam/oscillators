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
        this.handleMouseUp = this.handleMouseUp.bind(this)
        this.handleWaveChange = this.handleWaveChange.bind(this)
        this.isPlaying = this.isPlaying.bind(this)
    }

    isPlaying(oscillators) {
        let { oscillators } = this.state
        let playing = false

        oscillators.map((oscillator, i) => {
            if (oscillator.playing) {
                playing = true
            }
        })

        return playing
    }

    handlePlayPauseClick(index) {
        let { oscillators, playing } = this.state

        oscillators.map((oscillator, i) => {
            if (index == i) {

                oscillator.playing = !oscillator.playing
            }
        })

        playing = this.isPlaying(oscillators)

        this.setState({
            oscillators: oscillators,
            // playing: playing
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
                        console.log("success")
                    })
                    .fail(function (jqXHR, textStatus) {
                        console.log("fail", jqXHR, textStatus)
                    })
                    .always(function () {
                        console.log("complete")
                    })
            }
        })

        this.setState({
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

    handleMouseUp(index) {
        const frequency = this.state.oscillators[index].frequency
        this.updateOscillator(index, "frequency" , frequency)
    }


    render() {
        const { oscillators, playing } = this.state
        let oscillatorElements = []

        oscillators.map((oscillator, i) => {
            oscillatorElements.push(
                <Oscillator
                    {...oscillator}
                    handleMouseUp={this.handleMouseUp }
                    handlePlayPauseClick={this.handlePlayPauseClick }
                    handleFrequencyChange={ this.handleFrequencyChange }
                    handleWaveChange={this.handleWaveChange}
                    index = { i }
                    key = { i }
                />   
            )
        })

        return (
            <div>
                <ToggleSwitch
                    name="play"
                    value={ playing }
                    handleToggleClick={this.handlePlayPauseClick} />
                    
                <div className="Oscillators">
                    { oscillatorElements }
                </div>
            </div>
        )
    }
}