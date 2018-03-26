import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link, Redirect } from 'react-router-dom';
import { signUpUser } from '../actions';
import NavBarChange from './navbarchange';
import background from '../img/login.jpg';

class SignUp extends Component {

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

    renderRadioField(field) {
        return (
            <div className="form-check">
                <p> I want to &nbsp; &nbsp; &nbsp;
                    <label className="form-check-label">
                        <input className="form-check-input" type="radio" name="userType" {...field.input} value="hire" />Hire
                        <span className="circle">
                            <span className="check"></span>
                        </span>
                    </label>
                    <span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>
                    <label className="form-check-label">
                        <input className="form-check-input" type="radio" name="userType" {...field.input} value="work" />Work
                        <span className="circle">
                            <span className="check"></span>
                        </span>
                    </label>
                </p>
            </div>
        )
    }

    onSubmit(values) {
        console.log(values);
        this.props.signUpUser(values, () => this.props.history.push(`/@${values.username}`))
    };

    render() {

        const { handleSubmit } = this.props //property added by Redux Form to handle form submit.

        if (this.props.authenticated) {
            return <Redirect to={`/@${localStorage.getItem('username')}`} />
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
                                            <h2 className="card-title text-center">Register</h2>
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-5 mr-auto ml-auto">
                                                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                                                            <Field name="username" component={this.renderField} label="Username" type="text" />
                                                            <Field name="name" component={this.renderField} label="Name" type="text" />
                                                            <Field name="email" component={this.renderField} label="Email" type="text" />
                                                            <Field name="password" component={this.renderField} label="Password" type="password" />
                                                            <Field name="userType" component={this.renderRadioField} />
                                                            <div className="text-center">
                                                                <p style={{ fontSize: '12px', marginTop: '20px' }}>By Signing up, You agree to Terms and Conditions for using Letalent.</p>
                                                                <button className="btn btn-info" type="submit">Sign Up</button>
                                                                <p style={{ marginTop: '20px' }}>Already have an Account? <Link to="/login">Login</Link></p>
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

    if (!values.name) {
        errors.name = 'Name cannot be empty';
    }

    if (!values.username) {
        errors.username = 'Username cannot be empty';
    }

    if (!values.email) {
        errors.email = 'Email cannot be empty';
    }

    if (!values.password) {
        errors.password = 'Password cannot be empty';
    }

    return errors
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error, authenticated: state.auth.authenticated };
}

export default reduxForm({ validate: validate, form: 'SignUpForm' })(connect(mapStateToProps, {signUpUser})(SignUp));