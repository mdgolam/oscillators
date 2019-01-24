import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import Oscillators from '../containers/Oscillators'

const OcsillatorsPack = props => (
    <div>
        <Oscillators oscillators={ props.oscillators } />
    </div>
)

/* Hello.defaultProps = {
    name: 'David'
}

Hello.propTypes = {
    name: PropTypes.string
}
 */
document.addEventListener('DOMContentLoaded', () => {
    // const oscillators = JSON.parse(document.getElementsByTagName('body')[0].dataset.props)
    const oscillators = JSON.parse(document.getElementsByTagName('body')[0].dataset.props)
    ReactDOM.render(
        <OcsillatorsPack oscillators= { oscillators } />,
        document.body.appendChild(document.createElement('div')),
    )
})
