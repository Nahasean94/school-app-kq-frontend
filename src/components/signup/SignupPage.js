import React from 'react'
import SignupForm from './SignupForm'
import {Consumer} from "graphql-react"


class SignupPage extends React.Component {

    render() {
        return (
            <div className='row'>
                <div className="col-sm-6 offset-sm-2">
                    <Consumer >{graphql =>   <SignupForm   graphql={graphql}/>}</Consumer>
                </div>
            </div>
        )
    }
}

export default SignupPage