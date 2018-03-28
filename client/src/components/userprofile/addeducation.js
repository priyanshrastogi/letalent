import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

class AddEducation extends Component {

    
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

    onSubmit(values) {
    };


    render() {

        const { handleSubmit } = this.props //property added by Redux Form to handle form submit.

        return (
            <div className="modal fade" id="addEducationModal" tabindex="-1" role="">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="card card-signup card-plain">
                            <div className="col-md-10 ml-auto mr-auto">
                                <div className="card-header card-header-danger">
                                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true"><i className="material-icons">clear</i></button>
                                    <h4 className="card-title">Add Education</h4>
                                </div>
                            </div>
                            <div className="modal-body">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                                        <Field name="school" component={this.renderField} label="School" placeholdrr=""/>
                                        <Field name="degree" component={this.renderField} label="Degree" placeholder="" />
                                        <Field name="gradYear" component={this.renderField} label="Grad Year" placeholder="" />
                                        <div className="text-center">
                                            <button className="btn btn-danger" type="submit">Save</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
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

export default reduxForm({ validate, form: 'AddEducationForm' })(connect(null, null)(AddEducation));