import React from 'react'
import PropTypes from "prop-types"

class Home extends React.Component {
    render() {
        return <div className="container">
          <h1>School management system</h1>
          <h6>This is the home page</h6>

            <p>This page contains information that is general to all users. This is  information such as:</p>
            <ol>
                <li>School Events</li>
                <li>News Articles</li>
                <li>Announcements</li>
                <li>School gallery</li>
            </ol>
        </div>
    }
}

Home.contextTypes = {
    router: PropTypes.object.isRequired
}
export default Home