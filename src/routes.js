import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import App from "./components/App"
import Home from "./components/Home"
import SignupPage from './components/signup/SignupPage'
import LoginPage from './components/login/LoginPage'
import requireLogin from './utils/requireLogin'
import Students from './components/pages/Students'
import Teachers from './components/pages/Teachers'
import requireStudentAuth from './utils/requireStudentAuth'
import KCPE from './components/pages/KCPE'
import requireTeacherAuth from './utils/requireTeacherAuth'
import Classes from './components/pages/Classes'
import Menus from './components/pages/Menus'
import requireAdminAuth from './utils/requireAdminAuth'
import Roles from './components/pages/Roles'
import Subjects from './components/pages/Subjects'


export default () => {

    return (<BrowserRouter>
            <div>
                <App>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/signup" component={SignupPage}/>
                        <Route exact path="/login" component={LoginPage}/>
                        <Route exact path="/students" component={requireLogin(Students)}/>
                        <Route exact path="/teachers" component={requireLogin(Teachers)}/>
                        <Route exact path="/kcpe" component={requireStudentAuth(KCPE)}/>
                        <Route exact path="/subjects" component={requireStudentAuth(Subjects)}/>
                        <Route exact path="/classes" component={requireTeacherAuth(Classes)}/>
                        <Route exact path="/menus" component={requireAdminAuth(Menus)}/>
                        <Route exact path="/roles" component={requireAdminAuth(Roles)}/>
                    </Switch>
                </App>
            </div>
        </BrowserRouter>
    )
}