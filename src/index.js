import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './routes'
import {GraphQL, Provider as GraphQLReact,} from 'graphql-react'
import {applyMiddleware, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'
import {Provider} from 'react-redux'
import {setCurrent
    User} from './actions/loginActions'
import jwt from 'jsonwebtoken'
import registerServiceWorker from './registerServiceWorker'

const store = createStore(rootReducer, compose(applyMiddleware(thunk)))


if (localStorage.getItem('SchoolSystem')) {
    const token = jwt.decode(localStorage.getItem('SchoolSystem'))
        store.dispatch(setCurrentUser(token))

}


const graphql = new GraphQL()

ReactDOM.render(
    <Provider store={store}>
        <GraphQLReact value={graphql}>
            <Routes/>
        </GraphQLReact>
    </Provider>
    , document.getElementById('root'))

registerServiceWorker()