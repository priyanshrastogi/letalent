import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import NavBarDefault from '../navbardefault';
import _ from 'lodash';

class PublicProfile extends Component {

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

        return (
            <div>
                <li className="list-group-item">
                    <p>No Project to show.</p>
                </li>
            </div>
        )
    }

    renderLetalentJobs() {

        const { userprofile } = this.props;

        return (
            <div>
                <li className="list-group-item">
                    <p>No Jobs to show.</p>
                </li>
            </div>
        )
    }

    render() {

        const { userprofile } = this.props;

        return (
            <div>
                <NavBarDefault />
                <div className="profile-page">
                    <div className="page-header header-filter" data-parallax="true" style={{ backgroundImage: "url('')" }}></div>
                    <div className="main main-raised">
                        <div className="profile-content">
                            <div className="container">
                                <div className="row">
                                    <a className="btn btn-link btn-just-icon d-sm-none" style={{ position: 'absolute', top: '8px', right: '16px' }}><i className="fa fa-edit"></i></a>
                                    <div className="col-md-6 ml-auto mr-auto">
                                        <div className="profile">
                                            <div className="avatar">
                                                <img src="https://farm6.staticflickr.com/5612/15524972807_974a36b105_b.jpg" alt="Circle Image" className="img-raised rounded-circle img-fluid" />
                                            </div>
                                            <div className="name">
                                                <h3 className="title">{userprofile.user.name}</h3>
                                                <h6>{userprofile.tagline}</h6>
                                                <a href="#pablo" className="btn btn-just-icon btn-link"><i className="fa fa-twitter"></i></a>
                                                <a href="#pablo" className="btn btn-just-icon btn-link"><i className="fa fa-github"></i></a>
                                                <a href="#pablo" className="btn btn-just-icon btn-link"><i className="fa fa-linkedin"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="card card-nav-tabs">
                                                    <h4 className="card-header card-header-warning text-center">Skills</h4>
                                                    <ul className="card-body">
                                                        {this.renderSkills()}
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="card card-nav-tabs">
                                                    <h4 className="card-header card-header-danger text-center">Education</h4>
                                                    <ul className="list-group list-group-flush">
                                                        {this.renderEducation()}
                                                    </ul>
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
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="card card-nav-tabs">
                                                    <h4 className="card-header card-header-primary text-center">Jobs on Letalent</h4>
                                                    <ul className="list-group list-group-flush">
                                                        {this.renderLetalentJobs()}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane text-center" id="rating">
                                        <p>No Ratings Yet.</p>
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

function mapStateToProps(state) {
    return { userprofile: state.userprofile };
}

export default connect(mapStateToProps, null)(PublicProfile);