import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'


export default function (ComposedComponent) {
    class Authenticate extends React.Component {
        constructor(props){
            super(props)
            this.state={
                isAuthenticated:false
            }
        }
        componentWillMount() {
            if (this.props.isAuthenticated && this.props.user.role==='5c39b79cb9717d6060a33c80') {
               this.setState({isAuthenticated:true})
            }
        }

        componentWillUpdate(nextProps) {
            if(!nextProps.isAuthenticated){
                this.context.router.history.push('/')
            }
        }

        render() {
            if(this.state.isAuthenticated){
            return (
                <ComposedComponent {...this.props}/>
            )
            }
           return ( <div className="alert alert-danger">You do no have the permission to view this page</div>)
        }

    }

    Authenticate.propTypes = {
        isAuthenticated: PropTypes.bool.isRequired,
    }
    Authenticate.contextTypes = {
        router: PropTypes.object.isRequired
    }

    function mapStateToProps(state) {
        return {
            isAuthenticated: state.loginReducers.isAuthenticated,
            user:state.loginReducers.user
        }
    }

    return connect(mapStateToProps)(Authenticate)
}