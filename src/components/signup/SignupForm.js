import React from 'react'
import PropTypes from 'prop-types'
import validator from 'validator'
import {isEmpty} from 'lodash'
import TextFieldGroup from './../../shared/TextFieldsGroup'
import Select from 'react-select'
import {fetchOptionsOverride} from "./../../shared/fetchOverrideOptions"
import {Query} from 'graphql-react'
import {createUser, getSignupRoles, isUserExists} from '../../shared/queries'
import {NavLink} from 'react-router-dom'


let roleOptions
class SignupForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            role: '',
            errors: {},
            isLoading: false,
            invalid: false,
            loading: false,
            message: ''
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.checkUserExists = this.checkUserExists.bind(this)
        this.handleRoleChange = this.handleRoleChange.bind(this)
    }
    handleRoleChange = (role) => {
        this.setState({role})
    }

    checkUserExists(e) {
        const val = e.target.value
        if (val !== '') {
            this.props.graphql
                .query({
                    fetchOptionsOverride: fetchOptionsOverride,
                    resetOnLoad: true,
                    operation: {
                        variables: {email: val},
                        query: isUserExists
                    }
                })
                .request.then(({graphQLErrors, data}) => {
                    if (graphQLErrors) {
                        this.setState({errors: {form: graphQLErrors[0].message}, isLoading: false})
                    }
                    if (data) {
                        let errors = this.state.errors
                        let invalid
                        if (data.isUserExists.exists) {
                            invalid = true
                            errors.email = 'email already exists.'
                        } else {
                            invalid = false
                            errors.email = ''
                        }
                        this.setState({errors, invalid})
                    }
                }
            )
        }
    }

    validateInput(data) {
        let errors = {}
        if (validator.isEmpty(data.name)) {
            errors.name = 'This field is required'
        }
        if (validator.isEmpty(data.email)) {
            errors.email = 'This field is required'
        }
        if (!validator.isEmail(data.email)) {
            errors.email = 'This field must be an email'
        }
        if (validator.isEmpty(data.password)) {
            errors.password = 'This field is required'
        }
        if (validator.isEmpty(data.passwordConfirmation)) {
            errors.passwordConfirmation = 'This field is required'
        }
        if (!validator.equals(data.password, data.passwordConfirmation)) {
            errors.passwordConfirmation = 'Passwords must match'
        }
        return {
            errors,
            isValid: isEmpty(errors)
        }
    }

    isValid() {
        const {errors, isValid} = this.validateInput(this.state)
        if (!isValid) {
            this.setState({errors})
        }
        return isValid
    }

    onSubmit(e) {
        e.preventDefault()
        if (this.isValid()) {
            this.setState({errors: {}, isLoading: true})
            this.setState({errors: {}})
            this.props.graphql
                .query({
                    fetchOptionsOverride: fetchOptionsOverride,
                    resetOnLoad: true,
                    operation: {
                        variables: {
                            name: this.state.name.trim(),
                            email: this.state.email.trim(),
                            password: this.state.password.trim(),
                            role: this.state.role.value
                        },
                        query: createUser
                    }
                })
                .request.then(({graphQLErrors, data}) => {

                    if (graphQLErrors) {
                        this.setState({errors: {form: graphQLErrors[0].message}, isLoading: false})
                    } else if (data) {
                        if (data.createUser.success) {
                            this.setState({
                                name: '',
                                email: '',
                                password: '',
                                passwordConfirmation: '',
                                role: '',
                                errors: {},
                                isLoading: false,
                                invalid: false,
                                loading: false,
                                message: <div className="alert alert-info">Account successfully created.<br/>Please check your email for further instructions.</div>
                            })
                        }

                    }
                }
            )
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        const {errors, loading, message} = this.state
        if (loading) {
            return <p>Creating account…</p>
        }

        if (message) {
            return <p>{message}</p>
        }

        return (
            <div onSubmit={this.onSubmit}>
                <div className="row">
                    <div className="col-sm-4 offset-sm-4">
                        <h3>Sign up</h3>
                    </div>
                    {/*<div className="col-sm-4">*/}
                    {/*<button className="btn btn-default form-control" type="submit" id="tp-sign-up-btn">Sign in</button>*/}
                    {/*</div>*/}
                </div>
                <form onSubmit={this.onSubmit}>

                    {errors.form && <div className="alert alert-danger">{errors.form}</div>}
                    <TextFieldGroup
                        label="Name"
                        type="text"
                        name="name"
                        value={this.state.name} autoFocus={true}
                        onChange={this.onChange}
                        error={errors.name}
                    />

                    <TextFieldGroup
                        label="Email"
                        type="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange}
                        error={errors.email}
                        checkIfExists={this.checkUserExists}

                    />
                    <TextFieldGroup
                        label="Password"
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChange}
                        error={errors.password}
                    />
                    <TextFieldGroup
                        label="Confirm Password "
                        type="password"
                        name="passwordConfirmation"
                        value={this.state.passwordConfirmation}
                        onChange={this.onChange}
                        error={errors.passwordConfirmation}
                    />
                    <div className="form-group row">
                        <label className="col-sm-3 col-form-label" htmlFor="hosts">Role</label>
                        <div className="col-sm-9">
                            <Query
                                loadOnMount
                                loadOnReset
                                fetchOptionsOverride={fetchOptionsOverride}
                                query={getSignupRoles}
                            >
                                {({loading, data}) => {
                                    if (data) {
                                        roleOptions = data.getSignupRoles.map(role => {
                                            return {
                                                label: role.role,
                                                value: role.id
                                            }
                                        })
                                        return <Select.Creatable
                                            closeOnSelect={true}
                                            onChange={this.handleRoleChange}
                                            options={roleOptions}
                                            placeholder="Search role"
                                            removeSelected={true}
                                            value={this.state.role}/>
                                    }
                                    else if (loading) {
                                        return <p>Loading…</p>
                                    }
                                    return <p>Loading failed.</p>
                                }
                                }
                            </Query>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-9 offset-sm-3">
                            <button disabled={this.state.isLoading || this.state.invalid}
                                    className="btn btn-dark btn-sm form-control"
                                    type="submit">Sign up
                            </button>
                            <br/>
                            <br/>
                            <h6><NavLink to="/login" className="nav-link">Login</NavLink></h6>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}


SignupForm.contextTypes = {
    router: PropTypes.object.isRequired
}

export default SignupForm