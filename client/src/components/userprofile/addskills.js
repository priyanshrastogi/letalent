import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { updateUser } from '../../actions';

class AddSkills extends Component {

    renderField(field) {

        const fieldClass = `form-group`
        return (
            <div className={fieldClass}>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">{field.label}</span>
                    </div>
                    <input type="text" class="tagsinput form-control" {...field.input} placeholder={field.placeholder} />
                </div>
            </div>
            //If field is touched, only then show the error message.
        );
    }

    onSubmit(values) {
        let data = [];
        data = values.skills.split(',');
        data = this.props.userprofile.skills.concat(data);
        this.props.updateUser({skills: data}, 'addSkillsModal', () => window.$('#addSkillsModal').modal('hide'))
    };

    render() {

        const { handleSubmit } = this.props //property added by Redux Form to handle form submit.

        return (
            <div className="modal fade" id="addSkillsModal" tabindex="-1" role="">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="card card-signup card-plain">
                            <div className="col-md-10 ml-auto mr-auto">
                                <div className="card-header card-header-warning">
                                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true"><i className="material-icons">clear</i></button>
                                    <h4 className="card-title">Add Skills</h4>
                                </div>
                            </div>
                            <div className="modal-body">
                                <div className="card-body">
                                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                                        <Field name="skills" component={this.renderField} label="Skill" placeholder="Write multiple skills seperated by comma" />
                                        <div className="text-center">
                                            <button className="btn btn-warning" type="submit">Save</button>
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

function mapStateToProps(state) {
    return { userprofile: state.userprofile };
}

export default reduxForm({ validate, form: 'AddSkillsForm' })(connect(mapStateToProps, { updateUser })(AddSkills));