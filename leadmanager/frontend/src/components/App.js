import React, { Component, Fragment } from 'react'
import ReactDom from 'react-dom';
import Navbar from '../components/Layouts/Header'
import Dashbord from './leads/Dashboard'
// redux
import store from '../store';
import { Provider } from 'react-redux';
class App extends Component {
    render() {
        return (
            <Provider store={store} >
                <Fragment>
                    <Navbar />
                    <div className="container" >
                        <Dashbord />
                    </div>
                </Fragment>
            </Provider>

        )
    }
}



ReactDom.render(<App />, document.getElementById('app'))