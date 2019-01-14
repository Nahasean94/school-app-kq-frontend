import React from 'react'
import LoginForm from './LoginForm'
import {Consumer} from 'graphql-react'
import {NavLink} from 'react-router-dom'

class LoginPage extends React.Component {

    render() {
        return (
            <div className='row'>
                <div className="col-sm-6 offset-sm-2">
                    <Consumer>{graphql => <LoginForm graphql={graphql}/>}</Consumer>
                </div>
            </div>

        )
    }
}

export default LoginPage