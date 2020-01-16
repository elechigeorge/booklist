import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes, { string } from 'prop-types';
import { logout } from '../../actions/auth'


class Navbar extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    }


    render() {

        const { isAuthenticated, user } = this.props.auth;


        const authLinks = (
            <div className="navbar-nav">
                <span className="navbar-text mr-3">
                    <strong>
                        {user ? `Welcome ${user.username}` : ''}
                    </strong>
                </span>
                <button
                    onClick={this.props.logout}
                    className="nav-item nav-link btn btn-info btn-sm text-light">Logout</button>
            </div>
        );

        const guestLink = (
            <div className="navbar-nav">
                <Link to="/register" className="nav-item nav-link" >
                    Register
                        </Link>
                <Link to="/login" className="nav-item nav-link" >
                    Login
                        </Link>
            </div>
        );



        return (

            <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand" href="#">Booklist</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        {isAuthenticated ? authLinks : guestLink}
                    </div>
                </div>
            </nav>

        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar);