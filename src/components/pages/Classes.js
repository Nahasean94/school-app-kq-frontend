import React from 'react'
import PropTypes from "prop-types"

class Classes extends React.Component {
    render() {
        return <div className="container">
            <h3>This is the page for classes </h3>

        </div>
    }
}

Classes.contextTypes = {
    router: PropTypes.object.isRequired
}
export default Classes