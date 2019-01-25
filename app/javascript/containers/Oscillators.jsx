import React from 'react'
import $ from 'jquery'

import Oscillator from '../components/Oscillator';

export default class Oscillators extends React.Component {

    constructor(props) {
        super(props)

        let oscillators = []

        props.oscillators.map(oscillator => {
            oscillator.playing = false
            oscillators.push(oscillator)
        })

        this.state = {
            oscillators: oscillators
        }

        this.handlePlayPauseClick = this.handlePlayPauseClick.bind(this)
        this.handleFrequencyChange = this.handleFrequencyChange.bind(this)
        this.handleMouseUp = this.handleMouseUp.bind(this)
        this.handleWaveChange = this.handleWaveChange.bind(this)
    }

    handlePlayPauseClick(index) {
        let { oscillators } = this.state

        oscillators.map((oscillator, i) => {
            if (index == i) {
                oscillator.playing = !oscillator.playing
            }
        })

        this.setState({
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
    }

    handleMouseUp(index) {
        const frequency = this.state.oscillators[index].frequency
        this.updateFrequency(index, frequency)
    }

    updateFrequency(index, frequency) {
        let { oscillators } = this.state

        oscillators.map((oscillator, i) => {
            if (index == i) {
                const { id } = oscillator

                $.ajax({
                    dataType: "json",
                    method: "POST",
                    url: "/oscillators/tune",
                    data: { id: id, param_name: "frequency", value: frequency }
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

    render() {
        const { oscillators } = this.state
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
            <div className="Oscillators">
                { oscillatorElements }
            </div>
        )
    }
}