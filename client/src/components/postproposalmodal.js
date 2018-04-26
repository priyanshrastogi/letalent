import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { postProposal } from '../actions';

class PostProposalModal extends Component {

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
        this.props.postProposal(this.props.jobId, values, () => window.$('#postProposalModal').modal('hide'));
    };


    render() {

        const { handleSubmit } = this.props //property added by Redux Form to handle form submit.

        return (
            <div className="modal fade" id="postProposalModal" tabindex="-1" role="">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="card card-signup card-plain">
                            <div className="col-md-10 ml-auto mr-auto">
                                <div className="card-header card-header-info">
                                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true"><i className="material-icons">clear</i></button>
                                    <h4 className="card-title">Post A Proposal</h4>
                                </div>
                            </div>
                            <div className="modal-body">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                                        <Field name="proposal" component={this.renderTextAreaField} label="Your Proposal" placeholder="Alreast 50 words" />
                                        <Field name="proposedPrice" component={this.renderField} label="Proposed Price" placeholder="In INR" />
                                        <Field name="daysToComplete" component={this.renderField} label="Expected Complete Time" placeholder="In Days" />
                                        <div className="text-center">
                                            <button className="btn btn-info" type="submit">Send</button>
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

    if (!values.proposal) {
        errors.proposal = 'Fill out this field';
    }

    if (!values.proposedPrice) {
        errors.proposedPrice = 'Fill out this field';
    }

    if (!values.daysToComplete) {
        errors.daysToComplete = 'Fill out this field';
    }

    return errors
}

export default reduxForm({ validate, form: 'PostProposalForm' })(connect(null, { postProposal })(PostProposalModal));