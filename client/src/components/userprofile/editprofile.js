import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

class EditProfile extends Component {


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
            <div className="modal fade" id="editProfileModal" tabindex="-1" role="">
                <div className="modal-dialog modal-signup" role="document">
                    <div className="modal-content">
                        <div className="card card-signup card-plain">
                            <div class="modal-header">
                                <h5 class="modal-title card-title">Edit Profile</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <i class="material-icons">clear</i>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <Field name="tagline" component={this.renderField} label="Tagline" placeholder="e.g. Full Stack Developer in JavaScript" />
                                                <Field name="bio" component={this.renderField} label="bio" placeholder="A short bio about you. Write about who are you? what are your superpowers?" />
                                                <Field name="gradYear" component={this.renderField} label="Grad Year" placeholder="" />
                                            </div>
                                            <div className="col-md-6">
                                                <Field name="tagline" component={this.renderField} label="Tagline" placeholder="e.g. Full Stack Developer in JavaScript" />
                                                <Field name="bio" component={this.renderField} label="bio" placeholder="A short bio about you. Write about who are you? what are your superpowers?" />
                                                <Field name="gradYear" component={this.renderField} label="Grad Year" placeholder="" />
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <button className="btn btn-info" type="submit">Update Profile</button>
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

export default reduxForm({ validate, form: 'EditProfileForm' })(connect(null, null)(EditProfile));