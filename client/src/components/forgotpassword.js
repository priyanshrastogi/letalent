import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { loginUser } from '../actions';
import NavBarChange from './navbarchange';

class ForgotPassword extends Component {

    renderField(field) {
        const fieldClass = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`

        return (
            <div className={fieldClass}>
                <label for={field.name} class="bmd-label-floating">{field.label}</label>
                <input type={field.type} class="form-control" {...field.input} id={field.name} />
                <span class="form-control-feedback">
                    <i class="material-icons">clear</i>
                </span>
            </div>
            //If field is touched, only then show the error message.
        );
    }

    onSubmit(cred) {
        //this.props.loginUser(cred, () => this.props.history.push('/'));
    };

    render() {

        const { handleSubmit } = this.props //property added by Redux Form to handle form submit.

        return (
            <div>
                <NavBarChange />
                <div class="signup-page">
                    <div class="page-header header-filter" filter-color="purple" style={{ backgroundImage: "url(&apos;../assets/img/kit/free/bg7.jpg&apos;)" }}>
                        <div class="container">
                            <div class="row">
                                <div class="col-md-10 ml-auto mr-auto">
                                    <div class="card card-signup">
                                        <h2 class="card-title text-center">Reset Your Password</h2>
                                        <div class="card-body">
                                            <div class="row">
                                                <div class="col-md-5 mr-auto ml-auto">
                                                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                                                        <Field name="email" component={this.renderField} label="Email" type="text" />
                                                        <div className="text-center">
                                                            <button className="btn btn-info" type="submit">Get Reset Password Link</button>
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
    };
}

function validate(values) {
    const errors = {};

    if (!values.email) {
        errors.email = 'Please enter your email associated with your Letalent account.';
    }

    return errors
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error };
}

export default reduxForm({ validate: validate, form: 'forgotPasswordForm' })(connect(mapStateToProps, { loginUser })(ForgotPassword));