import React from 'react'
import PropTypes from "prop-types"
import {Query} from 'graphql-react'
import {fetchOptionsOverride} from '../../shared/fetchOverrideOptions'
import {getAllStudents} from '../../shared/queries'
// import moment from 'moment'

// let count =0

class Students extends React.Component {
    render() {
        return <div className="container">
            <h3>This page displays a list of all students </h3>
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
                    query={getAllStudents}
                >
                    {({loading, data}) => {
                        if (data) {
                           return data.getAllStudents.map(student => {
                                return (<tr>
                                    {/*<td>{count++}</td>*/}
                                    <td>{student.name}</td>
                                    <td>{student.email}</td>
                                    {/*<td>{moment(student.timestamp).format("DD-MM-YYYY")}</td>*/}
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

Students.contextTypes = {
    router: PropTypes.object.isRequired
}
export default Students