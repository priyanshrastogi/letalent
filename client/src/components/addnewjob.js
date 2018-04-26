import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link, Redirect } from 'react-router-dom';
import { isNumeric } from 'validator';
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
                        <option>Mobile Development</option>
                        <option>Software Development</option>
                        <option>Data Science</option>
                        <option>Artificial Intelligence</option>
                        <option>Grpahics Design</option>
                        <option>Animation and Movie Making</option>
                        <option>Content Writing</option>
                        <option>Software Testing</option>
                        <option>DJ and Music Design</option>
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
        values.skillsReq = values.skillsReq.split(',').map(element => element.trim(' '));
        this.props.postJob(values, () => { return this.props.history });
    };

    render() {

        const { handleSubmit } = this.props //property added by Redux Form to handle form submit.

        if (this.props.authenticated) {
            return (
                <div>
                    <NavBarDefault />
                    <div className="card">
                        <div className="card-body">
                            <div className="row" style={{ marginTop: '70px'}}>
                                <div className="col-md-8 offset-md-2 text-center" style={{ backgroundColor: 'white'}}>
                                    <h3 className="title">Add New Job</h3>
                                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                                        <Field name="title" component={this.renderField} label="Job Title" placeholder="e.g. Build An e-Commerce Website" />
                                        <Field name="description" component={this.renderTextAreaField} label="Description" placeholder="Write about desired Features, Requirements, Specifications, Technologies etc." />
                                        <Field name="category" component={this.renderSelectField} label="Job Category"/>
                                        <Field name="skillsReq" component={this.renderField} label="Skills Required" placeholder="Write multiple skills seperated by comma"/>
                                        <Field name="payType" component={this.renderRadioField} />
                                        <Field name="estimatedDuration" component={this.renderField} label="Estimated Duration" placeholder="(Optional) In Days" />
                                        <Field name="budget" component={this.renderField} label="Budget" placeholder="(Optional) In INR" />
                                        <div className="text-center">
                                            <button className="btn btn-info" type="submit">Post Job</button>
                                        </div>
                                    </form>
                                </div>
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

    if (!values.title || values.title.trim().length <= 8) {
        errors.name = 'Please Insert a good title';
    }

    if (!values.description || values.description.trim().length <= 40) {
        errors.description = 'Description should be atleast 40 characters long.';
    }

    if (values.budget && !isNumeric(values.budget)) {
        errors.budget=  'Budget should be a number'
    }

    if (values.estimatedDuration && !isNumeric(values.estimatedDuration)) {
        errors.estimatedDuration = 'Estimated duration should be a number'
    }

    return errors
}

function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
}

export default reduxForm({ validate: validate, form: 'AddNewJobForm' })(connect(mapStateToProps, { postJob })(AddNewJob));