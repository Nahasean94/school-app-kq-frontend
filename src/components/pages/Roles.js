import React from 'react'
import PropTypes from "prop-types"

class Roles extends React.Component {
    render() {
        return <div className="container">
            <h3>This is the page for roles </h3>

        </div>
    }
}

Roles.contextTypes = {
    router: PropTypes.object.isRequired
}
export default Roles