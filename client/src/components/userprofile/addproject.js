import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { addUserProject } from '../../actions'

class AddProject extends Component {


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
        values.technologyUsed = values.technologiesUsed.split(',');
        values.technologiesUsed = undefined;
        this.props.addUserProject(values, () => window.$('#addProjectModal').modal('hide'))
    };


    render() {

        const { handleSubmit } = this.props //property added by Redux Form to handle form submit.

        return (
            <div className="modal fade" id="addProjectModal" tabindex="-1" role="">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="card card-signup card-plain">
                            <div className="col-md-10 ml-auto mr-auto">
                                <div className="card-header card-header-info">
                                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true"><i className="material-icons">clear</i></button>
                                    <h4 className="card-title">Add Project</h4>
                                </div>
                            </div>
                            <div className="modal-body">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                                        <Field name="name" component={this.renderField} label="Title" placeholdrr="" />
                                        <Field name="description" component={this.renderField} label="Description" placeholder="" />
                                        <Field name="duration" component={this.renderField} label="Duration" placeholder="" />
                                        <Field name="technologiesUsed" component={this.renderField} label="Technology Used" placeholder="Write multiple technologies comma seperated" />
                                        <Field name="link" component={this.renderField} label="Link" placeholder="" />
                                        <div className="text-center">
                                            <button className="btn btn-info" type="submit">Save</button>
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

    if (!values.name) {
        errors.name = 'Fill out this field.';
    }

    if (!values.description) {
        errors.degree = 'Fill out this field.';
    }

    if (!values.technologiesUsed) {
        errors.technologiesUsed = 'Fill out this field.';
    }

    return errors
}

export default reduxForm({ validate, form: 'AddProjectForm' })(connect(null, { addUserProject })(AddProject));