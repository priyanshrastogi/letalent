import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import NavBarDefault from '../navbardefault';
import _ from 'lodash';
import AddEducation from './addeducation';
import AddExperience from './addexperience';
import AddSkills from './addskills';
import AddProject from './addproject';
import EditProfile from './editprofile';

class PrivateProfile extends Component {

    renderExperience() {

        const { userprofile } = this.props;

        return _.map(userprofile.workExperience, experience => {
            return (
                <li className="list-group-item">
                    <p><strong>{experience.designation}, {experience.company}</strong><br />{experience.duration}</p>
                </li>
            );
        });
    }

    renderSkills() {

        const { userprofile } = this.props;

        return (
            <div>
                <p>{userprofile.skills.join(", ")}</p>
            </div>
        )
    }

    renderEducation() {

        const { userprofile } = this.props;

        return _.map(userprofile.education, education => {
            return (
                <li className="list-group-item">
                    <p><strong>{education.degree}, {education.school}</strong><br />{education.gradYear}</p>
                </li>
            );
        });
    }

    renderShowcase() {

        const { userprofile } = this.props;

        return _.map(userprofile.projects, project => {
            return (
                <li className="list-group-item">
                    <p><strong>{project.name}</strong><br />{project.technologyUsed.join(", ")}</p>
                </li>
            );
        });
    }

    renderLetalentJobs() {
        return (
            <div>
                <li className="list-group-item">
                    <p>No Jobs to show.</p>
                </li>
            </div>
        )
    }

    renderSocialLinks() {
        const {userprofile} = this.props;
        if(userprofile.socialLinks) {
            return(
                <div>
                    {userprofile.socialLinks.twitter ? <a href={`https://twitter.com/${userprofile.socialLinks.twitter}`} className="btn btn-just-icon btn-link"><i className="fa fa-twitter"></i></a> : ''}
                    {userprofile.socialLinks.facebook ? <a href={`https://facebook.com/${userprofile.socialLinks.facebook}`} className="btn btn-just-icon btn-link"><i className="fa fa-facebook"></i></a> : ''}
                    {userprofile.socialLinks.github ? <a href={`https://github.com/${userprofile.socialLinks.github}`} className="btn btn-just-icon btn-link"><i className="fa fa-github"></i></a> : ''}
                    {userprofile.socialLinks.linkedin ? <a href={`https://linkedin.com/in/${userprofile.socialLinks.linkedin}`} className="btn btn-just-icon btn-link"><i className="fa fa-linkedin"></i></a> : ''}
                    {userprofile.socialLinks.medium ? <a href={`https://medium.com/@${userprofile.socialLinks.medium}`} className="btn btn-just-icon btn-link"><i className="fa fa-medium"></i></a> : ''}
                    {userprofile.socialLinks.behance ? <a href={`https://behance.net/${userprofile.socialLinks.behance}`} className="btn btn-just-icon btn-link"><i className="fa fa-behance"></i></a> : ''}
                    {userprofile.socialLinks.pinterest ? <a href={`https://pinterest.com/${userprofile.socialLinks.pinterest}`} className="btn btn-just-icon btn-link"><i className="fa fa-pinterest"></i></a> : ''}
                    {userprofile.socialLinks.codepen ? <a href={`https://codepen.io/${userprofile.socialLinks.codepen}`} className="btn btn-just-icon btn-link"><i className="fa fa-codepen"></i></a> : ''}
                </div>
            );
        }
        else {
            return(
                <div></div>
            );
        } 
    }

    render() {

        const { userprofile } = this.props;

        return(
            <div>
                <NavBarDefault />
                <div className="profile-page">
                    <div className="page-header header-filter" data-parallax="true" style={{ backgroundImage: "url('')" }}></div>
                    <div className="main main-raised">
                        <div className="profile-content">
                            <div className="container">
                                <div className="row">
                                    <button className="btn btn-link d-none d-sm-block" data-toggle="modal" data-target="#editProfileModal" style={{ position: 'absolute', top: '8px', right: '16px' }}><i className="fa fa-edit"></i><strong>Edit Profile</strong></button>
                                    <a className="btn btn-link btn-just-icon d-sm-none" style={{ position: 'absolute', top: '8px', right: '16px' }}><i className="fa fa-edit"></i></a>
                                    <div className="col-md-6 ml-auto mr-auto">
                                        <div className="profile">
                                            <div className="avatar">
                                                <img src="https://farm6.staticflickr.com/5612/15524972807_974a36b105_b.jpg" alt="Circle Image" className="img-raised rounded-circle img-fluid" />
                                            </div>
                                            <div className="name">
                                                <h3 className="title">{userprofile.user.name}</h3>
                                                <h6>{userprofile.tagline}</h6>
                                                {this.renderSocialLinks()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*
                                <div className="row">
                                    <div className="col-md-6 ml-auto mr-auto" style={{ marginTop: '20px', marginBottom: '20px' }}>
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="progress">
                                                    <div className="progress-bar bg-success" role="progressbar" style={{ width: '25%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                                <p>Profile is 25% Complete. Please Complete the profile for doing Jobs.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>*/}
                                <div className="description text-center">
                                    <p>{userprofile.bio}</p>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 ml-auto mr-auto">
                                        <div className="profile-tabs">
                                            <ul className="nav nav-pills nav-pills-icons justify-content-center" role="tablist">
                                                <li className="nav-item">
                                                    <a className="nav-link active" href="#profile" role="tab" data-toggle="tab">
                                                        <i className="material-icons">perm_identity</i> Profile
                                                </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" href="#work" role="tab" data-toggle="tab">
                                                        <i className="material-icons">work</i> Work
                                                </a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" href="#rating" role="tab" data-toggle="tab">
                                                        <i className="material-icons">star</i> Ratings
                                                </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="tab-content tab-space">
                                    <div className="tab-pane active" id="profile">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="card card-nav-tabs">
                                                    <h4 className="card-header card-header-success text-center">Experience</h4>
                                                    <ul className="list-group list-group-flush">
                                                        {this.renderExperience()}
                                                    </ul>
                                                    <div className="col-8 ml-auto mr-auto text-center">
                                                        <button className="btn btn-sm btn-success" data-toggle="modal" data-target="#addExperienceModal">Add Experience</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="card card-nav-tabs">
                                                    <h4 className="card-header card-header-warning text-center">Skills</h4>
                                                    <ul className="card-body">
                                                        {this.renderSkills()}
                                                    </ul>
                                                    <div className="col-8 ml-auto mr-auto text-center">
                                                        <button className="btn btn-sm btn-warning" data-toggle="modal" data-target="#addSkillsModal">Add Skills</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="card card-nav-tabs">
                                                    <h4 className="card-header card-header-danger text-center">Education</h4>
                                                    <ul className="list-group list-group-flush">
                                                        {this.renderEducation()}
                                                    </ul>
                                                    <div className="col-8 ml-auto mr-auto text-center">
                                                        <button className="btn btn-sm btn-danger" data-toggle="modal" data-target="#addEducationModal">Add Education</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane" id="work">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="card card-nav-tabs">
                                                    <h4 className="card-header card-header-info text-center">Showcase</h4>
                                                    <ul className="list-group list-group-flush">
                                                        {this.renderShowcase()}
                                                    </ul>
                                                    <div className="col-8 ml-auto mr-auto text-center">
                                                        <button className="btn btn-sm btn-success" data-toggle="modal" data-target="#addProjectModal">Add Project</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="card card-nav-tabs">
                                                    <h4 className="card-header card-header-primary text-center">Jobs on Letalent</h4>
                                                    <ul className="list-group list-group-flush">
                                                        {this.renderLetalentJobs()}
                                                    </ul>
                                                    <div className="col-8 ml-auto mr-auto text-center">
                                                        <Link className="btn btn-sm btn-success" to="/jobs">Find a Job</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane text-center" id="rating">
                                            <p>No Ratings Yet.</p>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="btn btn-info">Submit Profile For Review</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <AddEducation />
                <AddExperience />
                <AddSkills />
                <AddProject />
                <EditProfile />
            </div>
        );
    };
}

function mapStateToProps(state) {
    return { userprofile: state.userprofile };
}

export default connect(mapStateToProps, null)(PrivateProfile);