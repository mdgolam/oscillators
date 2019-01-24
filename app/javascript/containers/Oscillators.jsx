import React from 'react'

import Oscillator from '../components/Oscillator';

export default class Oscillators extends React.Component {

    constructor(props) {
        super(props)

        // let oscillators = []

        // props.oscillators.map(oscillator => {
        //     oscillators.push ({
        //         title: oscillator.title,
        //         frequency: 0
        //     })
        // })

        this.state = {
            oscillators: props.oscillators
        }

        this.handleDownCLick = this.handleDownCLick.bind(this)
        this.handleUpCLick = this.handleUpCLick.bind(this)
        // this.handleResetCLick = this.handleResetCLick.bind(this)
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

    // handleResetCLick() {
    //     this.setState({
    //         frequency: 0
    //     })
    // }

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