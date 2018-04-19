import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link, Redirect } from 'react-router-dom';
import { postJob } from '../actions';
import NavBarDefault from './navbardefault';

class AddNewJob extends Component {

    renderField(field) {
        
        const fieldClass = `form-group`
        return (
            <div className={fieldClass}>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">{field.label}</span>
                    </div>
                    <input type="text" class="form-control" {...field.input} placeholder={field.placeholder} />
                </div>
            </div>
            //If field is touched, only then show the error message.
        );
    }

    renderTextAreaField(field) {

        const fieldClass = `form-group`
        return (
            <div className={fieldClass}>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">{field.label}</span>
                    </div>
                    <textarea class="form-control" {...field.input} placeholder={field.placeholder} rows="4"></textarea>
                </div>
            </div>
        )

    }

    renderSelectField(field) {

        return (
            <div className="form-group">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">{field.label}</span>
                    </div>
                    <select class="form-control" {...field.input}>
                        <option disable>Please Select</option>
                        <option>Web Development</option>
                    </select>
                </div>
            </div>
        )
    }

    renderRadioField(field) {
        return (
            <div className="form-check">
                <div className="input-group">
                    <div className="input-group-prepend"><span class="input-group-text">Pay Type</span> &nbsp; &nbsp; &nbsp;</div>
                    <div style={{marginTop: '5px'}}>
                        <label className="form-check-label">
                        <input className="form-check-input" type="radio" name="payType" {...field.input} value="fixed" />Fixed
                        <span className="circle">
                            <span className="check"></span>
                        </span>
                    </label>
                    <span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span>
                    <label className="form-check-label">
                        <input className="form-check-input" type="radio" name="payType" {...field.input} value="hourly" />Hourly
                        <span className="circle">
                            <span className="check"></span>
                        </span>
                    </label>
                    </div>
                </div>
            </div>
        )
    }

    onSubmit(values) {
        console.log(values);
        this.props.postJob(values, () => { return this.props.history });
    };

    render() {

        const { handleSubmit } = this.props //property added by Redux Form to handle form submit.

        if (this.props.authenticated) {
            return (
                <div>
                    <NavBarDefault />
                    <div className="container">
                        <div className="row" style={{ marginTop: '70px'}}>
                            <div className="col-md-8" style={{ backgroundColor: 'white', paddingTop: '50px'}}>
                                <div class="card card-nav-tabs">
                                    <h3 class="card-header card-header-info text-center">Add New Job</h3>
                                    <div class="card-body">
                                        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                                            <Field name="title" component={this.renderField} label="Job Title" placeholder="e.g. Build An e-Commerce Website" />
                                            <Field name="description" component={this.renderTextAreaField} label="Description" placeholder="Write about desired Features, Requirements, Specifications, Technologies etc." />
                                            <Field name="category" component={this.renderSelectField} label="Job Category"/>
                                            <Field name="skillsReq" component={this.renderField} label="Skills Required" />
                                            <Field name="payType" component={this.renderRadioField} />
                                            <Field name="fixedPayPrice" component={this.renderField} label="Fixed Pay Price" placeholder="Job Price you are willing to pay in INR (Leave Blank if Hourly Pay Type)" />
                                            <Field name="estimatedDuration" component={this.renderField} label="Estimated Duration" placeholder="Estimated Duration of Job In Hours (Leave Blank if Fixed Pay Type)" />
                                            <Field name="perHourPrice" component={this.renderField} label="Per Hour Pay" placeholder="Price You are willing to pay per hour in INR (Leave Blank if Fixed Pay Type)" />
                                            <div className="text-center">
                                                <button className="btn btn-info" type="submit">Post Job</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 text-center" style={{ backgroundColor: 'white', paddingTop: '50px' }}>
                                <h4>Top Freelancers</h4>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        else {
            return (
                <Redirect to={`/login?next=${this.props.location.pathname}`} />
            );
        }
    };
}

function validate(values) {
    const errors = {};

    if (!values.name || values.name.trim().length <= 4) {
        errors.name = 'Invalid Name';
    }

    if (!values.username || values.username.trim().length <= 3) {
        errors.username = 'Username should be atleast 3 characters long';
    }

    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!values.email || !re.test(values.email.toLowerCase())) {
        errors.email = 'Invalid Email'
    }

    if (!values.password || values.password.length < 8) {
        errors.password = 'Password should be atleast 8 characters long';
    }

    if (!values.userType) {
        errors.userType = 'Select a user type'
    }

    return errors
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error, authenticated: state.auth.authenticated };
}

export default reduxForm({ validate: validate, form: 'AddNewJobForm' })(connect(mapStateToProps, {  })(AddNewJob));