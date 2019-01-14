import React from 'react'
import PropTypes from "prop-types"

class KCPE extends React.Component {
    render() {
        return <div className="container">
            <h3>This is the page for kcpe </h3>

        </div>
    }
}

KCPE.contextTypes = {
    router: PropTypes.object.isRequired
}
export default KCPE