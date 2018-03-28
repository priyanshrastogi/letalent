import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import  { connect } from 'react-redux' 

class NavBarChange extends Component {

    renderNavLinks() {
        if (this.props.authenticated) {
            return(
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        {localStorage.getItem('userType') === 'work' ?
                            <Link className="nav-link" to="/jobs"><strong>Find Jobs</strong></Link> :
                            <Link className="nav-link" to="/jobs/new"><strong>Post A Job</strong></Link>
                        }
                    </li>
                    <li className="nav-item dropdown">
                        <Link className="nav-link" to="#" data-toggle="dropdown"><strong>{localStorage.getItem('name').split(' ')[0]}</strong></Link>
                        <div className="dropdown-menu">
                            <Link className="dropdown-item" to={`/@${localStorage.getItem('username')}`}>Profile</Link>
                            <Link className="dropdown-item" to={`/@${localStorage.getItem('username')}/jobs`}>My Jobs</Link>
                            <Link className="dropdown-item" to={`/@${localStorage.getItem('username')}/proposals`}>My Proposals</Link>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <Link className="nav-link" to="#" data-toggle="dropdown"><i className="material-icons">notifications</i></Link>
                        <div className="dropdown-menu">
                            <a className="dropdown-item" href="#">Notifications Show Up Here</a>
                        </div>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="#"><i className="material-icons">chat</i></Link>
                    </li>
                    <li className="nav-item dropdown">
                        <Link className="nav-link" to="#" data-toggle="dropdown"><i className="material-icons">settings</i></Link>
                        <div className="dropdown-menu">
                            <Link className="dropdown-item" to="/settings">Settings</Link>
                            <Link className="dropdown-item" to="/logout">Logout</Link>
                        </div>
                    </li>
                </ul>
            );
        }

        else {
            return (
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/how-it-works"><strong>How It Works</strong></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login"><strong>Login</strong></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/signup"><strong>Sign Up</strong></Link>
                    </li>
                </ul>
            );
        }
    }

    render() {

        return (
            <nav className="navbar navbar-color-on-scroll navbar-transparent fixed-top navbar-expand-lg " color-on-scroll="100" id="sectionsNav">
                <div className="container">
                    <div className="navbar-translate">
                        <Link className="navbar-brand" to="/"><strong>Letalent</strong></Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                            <span className="navbar-toggler-icon"></span>
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                    <div className="collapse navbar-collapse">
                        {this.renderNavLinks()}
                    </div>
                </div>
            </nav>
        )
    }
}

function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps, null)(NavBarChange)