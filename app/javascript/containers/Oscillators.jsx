import React from 'react'

import Oscillator from '../components/Oscillator';

export default class Oscillators extends React.Component {

    constructor(props) {
        super(props)

        let oscillators = []

        props.oscillators.map(oscillator => {
            oscillator.play = false
            oscillators.push(oscillator)
        })

        this.state = {
            oscillators: oscillators
        }

        this.handleDownCLick = this.handleDownCLick.bind(this)
        this.handleUpCLick = this.handleUpCLick.bind(this)
        this.handlePlayClick = this.handlePlayClick.bind(this)
        this.handleResetClick = this.handleResetClick.bind(this)
    }

    handlePlayClick(index) {
        let { oscillators } = this.state
        
        oscillators.map((oscillator, i) => {
            if (index == i) {
                oscillator.play = !oscillator.play
            }
        })

        this.setState({
            oscillators: oscillators
        })
    }

    handleUpCLick(index) {
        console.log(this.state.oscillators[index])
        
        const { oscillators } = this.state

        oscillators.map((oscillator, i) => {
            if (index == i) {
                oscillator.frequency++

                let { id, frequency } = oscillator
                $.ajax({
                    dataType: "json",
                    method: "POST",
                    url: "/oscillators/tune",
                    data: { id: id, param_name: "frequency", value: frequency }
                })
                .done(function(){
                    console.log("success")
                })
                .fail(function (jqXHR, textStatus) {
                    console.log("fail", jqXHR, textStatus)
                    // console.log(JSON.parse(jqXHR.responseText).errors)
                })
                .always(function () {
                    console.log("always")
                })
            }
        })
        
        this.setState({
            oscillators: oscillators
        })

    }

    handleResetClick(index) {
        // console.log(this.state.oscillators[index])

        const { oscillators } = this.state

        oscillators.map((oscillator, i) => {
            if (index == i) {
                oscillator.frequency = 440

                let { id, frequency } = oscillator
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
                        // console.log(JSON.parse(jqXHR.responseText).errors)
                    })
                    .always(function () {
                        console.log("always")
                    })
            }
        })

        this.setState({
            oscillators: oscillators
        })

    }

    handleDownCLick(index) {
        console.log(this.state.oscillators[index])

        let { oscillators } = this.state

        oscillators.map((oscillator, i) => {
            if (index == i) {
                oscillator.frequency--

                let { id, frequency } = oscillator
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
                        // console.log(JSON.parse(jqXHR.responseText).errors)
                    })
                    .always(function () {
                        console.log("always")
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
                    handleDownCLick={ this.handleDownCLick }
                    handleUpCLick={ this.handleUpCLick }
                    handlePlayClick={this.handlePlayClick}
                    handleResetClick={this.handleResetClick}
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