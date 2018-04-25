import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link, Redirect } from 'react-router-dom';
import queryString from 'qs';
import { loginUser } from '../actions';
import NavBarChange from './navbarchange';
import background from '../img/login.jpg';

class Login extends Component {

    renderField(field) {

        const fieldClass = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`

        return (
            <div className={fieldClass}>
                <label for={field.name} className="bmd-label-floating">{field.label}</label>
                <input type={field.type} className="form-control" {...field.input} id={field.name} />
                <span className="form-control-feedback">
                    <i className="material-icons">clear</i>
                </span>
                </div>
            //If field is touched, only then show the error message.
        );
    }

    onSubmit(cred) {
        cred.username = cred.username.toLowerCase();
        if (queryString.parse(this.props.location.search).next!=undefined) {
            this.props.loginUser(cred, () => this.props.history.push(`${queryString.parse(this.props.location.search).next}`));
        }
        
        else {
            console.log(this.props.location.query);
            this.props.loginUser(cred, () => this.props.history.push(`/@${cred.username}`));
        }
    };

    renderSignUpLink() {
        if (queryString.parse(this.props.location.search).next!=undefined) {
            return (
                <p><strong>Don't have an account yet? <Link to={`/signup?next=${queryString.parse(this.props.location.search).next}`}>Sign Up</Link></strong></p>
            )
        }

        else {
            return (
                <p><strong>Don't have an account yet? <Link to="/signup">Sign Up</Link></strong></p>
            )
        }
    }

    render() {

        const { handleSubmit, submitting } = this.props //property added by Redux Form to handle form submit.

        if(this.props.authenticated) {
            return <Redirect to={`/@${localStorage.getItem('username')}`}/>
        }

        else {
            return (
                <div>
                    <NavBarChange />
                    <div className="signup-page">
                        <div className="page-header header-filter" filter-color="purple" style={{ backgroundImage: `url(${background})` }}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-10 ml-auto mr-auto">
                                        <div className="card card-signup">
                                            <h2 className="card-title text-center">Login</h2>
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-5 mr-auto ml-auto">
                                                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                                                            <Field name="username" component={this.renderField} label="Username" type="text" />
                                                            <Field name="password" component={this.renderField} label="Password" type="password" />
                                                            <div className="text-center">
                                                                {submitting ? <button className="btn btn-info" disabled type="submit">Logging You In</button>
                                                                : <button className="btn btn-info" type="submit">Login</button>}
                                                                <p style={{ marginTop: '20px' }}><Link to="/forgotpassword">Forgot Password?</Link></p>
                                                                {this.renderSignUpLink()}
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    };
}

function validate(values) {
    const errors = {};

    if (!values.username) {
        errors.username = 'Username cannot be empty.';
    }

    if (!values.password) {
        errors.password = 'Password cannot be empty.';
    }

    return errors
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error, authenticated: state.auth.authenticated };
}

export default reduxForm({ validate: validate, form: 'LoginForm' })(connect(mapStateToProps, { loginUser })(Login));