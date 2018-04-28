import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { isURL } from 'validator';
import { submitJob } from '../../actions';

class SubmitJobModal extends Component {

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
                    <textarea class="form-control" {...field.input} placeholder={field.placeholder} rows="8"></textarea>
                </div>
            </div>
        )

    }

    onSubmit(values) {
        this.props.submitJob(this.props.jobId, values, () => {
            window.$('#submitJobModal').modal('hide');
            this.props.history.push('/dashboard');
        });
    };


    render() {

        const { handleSubmit } = this.props //property added by Redux Form to handle form submit.

        return (
            <div className="modal fade" id="submitJobModal" tabindex="-1" role="">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="card card-signup card-plain">
                            <div className="col-md-10 ml-auto mr-auto">
                                <div className="card-header card-header-success">
                                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true"><i className="material-icons">clear</i></button>
                                    <h4 className="card-title">Submit Job</h4>
                                </div>
                            </div>
                            <div className="modal-body">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                                        <Field name="reviewUrl" component={this.renderField} label="Review URL" placeholder="URL where Employer can review your work." />
                                        <Field name="sourceUrl" component={this.renderField} label="Source URL" placeholder="URL of Source/files.(Dropbox, Github, Google Drive etc.)" />
                                        <Field name="message" component={this.renderTextAreaField} label="Meassage" placeholder="Required" />
                                        <div className="text-center">
                                            <button className="btn btn-success" type="submit">Submit</button>
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

    if (!values.sourceUrl || isURL(values.sourceUrl)) {
        errors.proposal = 'Invalid URL';
    }

    if (!values.reviewUrl || isURL(values.reviewUrl)) {
        errors.proposedPrice = 'Invalid URL';
    }

    if (!values.message) {
        errors.daysToComplete = 'Fill out this field';
    }

    return errors
}

export default reduxForm({ validate, form: 'SubmitJobModal' })(connect(null, { submitJob })(SubmitJobModal));