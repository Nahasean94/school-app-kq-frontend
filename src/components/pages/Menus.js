import React from 'react'
import PropTypes from "prop-types"

class Menus extends React.Component {
    render() {
        return <div className="container">
            <h3>This is the page for menus </h3>

        </div>
    }
}

Menus.contextTypes = {
    router: PropTypes.object.isRequired
}
export default Menus