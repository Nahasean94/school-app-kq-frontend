import React from 'react'
import PropTypes from "prop-types"

class PageNotFound extends React.Component {
    render() {
        return <div className="alert alert-warning">
            <h2>Oops! Page not found</h2>

        </div>
    }
}

PageNotFound.contextTypes = {
    router: PropTypes.object.isRequired
}
export default PageNotFound