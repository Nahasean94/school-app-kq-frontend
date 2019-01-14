import React from 'react'
import PropTypes from "prop-types"

class Subjects extends React.Component {
    render() {
        return <div className="container">
            <h3>This is the page for subjects </h3>

        </div>
    }
}

Subjects.contextTypes = {
    router: PropTypes.object.isRequired
}
export default Subjects