import React, { Component, Fragment } from 'react'
import ReactDom from 'react-dom';
import Navbar from '../components/Layouts/Header'
import Dashbord from './leads/Dashboard';
import Login from '../components/accounts/Login';
import Register from '../components/accounts/Register'
import PrivateRoute from '../components/common/PrivateRoutes'

// React Router
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

// Aler Stuff
import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import Alert from './Layouts/Alerts';

// redux Stuff
import store from '../store';
import { Provider } from 'react-redux';
import { loadUser } from '../actions/auth'



// Alert Options 
const alertOptions = {
    timeout: 3000,
    position: 'top center'
}


class App extends Component {

    componentDidMount() {
        store.dispatch(loadUser());
    }

    render() {
        return (
            <Provider store={store} >
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Router>
                        <Fragment>
                            <Navbar />
                            <Alert />
                            <div className="container" >
                                <Switch>
                                    <PrivateRoute exact path="/" component={Dashbord} />
                                    <Route exact path="/register" component={Register} />
                                    <Route exact path="/login" component={Login} />
                                </Switch>
                            </div>
                        </Fragment>
                    </Router>
                </AlertProvider>
            </Provider>

        )
    }
}



ReactDom.render(<App />, document.getElementById('app'))