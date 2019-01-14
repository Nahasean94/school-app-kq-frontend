import React from 'react'
import jwt from "jsonwebtoken"
import {Link} from "react-router-dom"
import PropTypes from "prop-types"
import {getDirectiveValues} from 'graphql/execution/values'

class NavigationBar extends React.Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
    }


    logout(e) {
        e.preventDefault()
        localStorage.removeItem('SchoolSystem')
        this.context.router.history.push('/')
    }

    render() {

        let isAuthenticated = false
        let token
        if (localStorage.getItem('SchoolSystem')) {
            token = jwt.decode(localStorage.getItem('SchoolSystem'))
            isAuthenticated = true
        }

        const userLinks = (<div className="navbar-nav flex-row ml-md-auto">
            <Link to="" className="nav-item nav-link nav-link-custom" onClick={this.logout}>Logout</Link>
        </div>)

        const guestLinks = (<div className="navbar-nav flex-row ml-md-auto">
            <Link to="login" className="nav-item nav-link nav-link-custom">Sign in</Link>
        </div>)

        const studentLinks = <div className=" collapse navbar-collapse">
            <div className="navbar-nav">
                <Link to="/students" className="nav-item nav-link nav-link-custom">Students</Link>
                <Link to="/subjects" className="nav-item nav-link nav-link-custom">Subjects</Link>
                <Link to="/kcpe" className="nav-item nav-link nav-link-custom">KCPE</Link>
            </div>
        </div>

        const teacherLinks = <div className=" collapse navbar-collapse">
            <div className="navbar-nav">
                <Link to="/students" className="nav-item nav-link nav-link-custom">Students</Link>
                <Link to="/classes" className="nav-item nav-link nav-link-custom">Classes</Link>
            </div>
        </div>

        const adminLinks = <div className=" collapse navbar-collapse">
            <div className="navbar-nav">
                <Link to="/students" className="nav-item nav-link nav-link-custom">Students</Link>
                <Link to="/teachers" className="nav-item nav-link nav-link-custom">Teachers</Link>
                {/*<Link to="/roles" className="nav-item nav-link nav-link-custom">Roles</Link>*/}
                {/*<Link to="/menus" className="nav-item nav-link nav-link-custom">Menus</Link>*/}
            </div>
        </div>
        let roleLinks = ''
        if (token) {
            if (token.role === '5c3a4b8f427a0e57a2b9df44') {//student role
                roleLinks = studentLinks
            } else if (token.role === '5c39b79cb9717d6060a33c80') {//teacher role
                roleLinks = teacherLinks
            } else if (token.role === '5c3a4be8d08d5d582332d66b') {//admin role
                roleLinks = adminLinks
            }
        }

        return (
            <div className="container">
                <nav className="navbar navbar-expand-sm bg-dark-green fixed-top ">
                    <Link className="navbar-brand" to="/">
                        Home
                    </Link>
                    {isAuthenticated ? roleLinks : ''}
                    <div className="navbar-collapse" id="navbarNavAltMarkup">
                        {isAuthenticated ? userLinks : guestLinks}
                    </div>
                </nav>
            </div>

        )
    }
}

NavigationBar.contextTypes = {
    router: PropTypes.object.isRequired
}

export default NavigationBar