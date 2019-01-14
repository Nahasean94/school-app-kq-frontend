import React from 'react'
import PropTypes from "prop-types"
import {Query} from 'graphql-react'
import {fetchOptionsOverride} from '../../shared/fetchOverrideOptions'
import {getAllTeachers} from '../../shared/queries'



class Teachers extends React.Component {
    constructor(props){
        super(props)
        this.state={
            count:0
        }
    }
    render() {
        let count =0
        return <div className="container">
            <h3>This page displays a list of all teachers </h3>
            <table className="table">
                <thead>
                <tr>

                    {/*<th scope="col">#</th>*/}
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    {/*<th scope="col">Date Joined</th>*/}
                </tr>
                </thead>
                <tbody>
                <Query
                    loadOnMount
                    loadOnReset
                    fetchOptionsOverride={fetchOptionsOverride}
                    query={getAllTeachers}
                >
                    {({loading, data}) => {
                        if (data) {
                           return data.getAllTeachers.map(teacher => {
                                return (<tr>
                                    {/*<td>{count++}</td>*/}
                                    <td>{teacher.name}</td>
                                    <td>{teacher.email}</td>
                                    {/*<td>{new Date(teacher.timestamp).toLocaleString()}</td>*/}
                                </tr>)
                            })

                        } else if (loading) {
                            return <tr><td>Loading…</td></tr>
                        }
                        return <tr><td>Loading failed.</td></tr>
                    }
                    }
                </Query>
                </tbody>
            </table>
        </div>
    }
}

Teachers.contextTypes = {
    router: PropTypes.object.isRequired
}
export default Teachers