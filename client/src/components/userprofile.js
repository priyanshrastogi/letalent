import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link, Redirect } from 'react-router-dom';
import NavBarChange from './navbarchange';
import _ from 'lodash';

class UserProfile extends Component {

    renderExperience() {

        return (
            <div>
                <li className="list-group-item">
                    <p><strong>Software Developer, Letalent</strong><br/>Feb 2018 - Present</p>
                </li>
                <li className="list-group-item">
                    <p><strong>Machine Learning Intern, RecruiterGrid</strong><br />Nov 2017 - Dec 2017</p>
                </li>
            </div>
        )
    }

    renderSkills() {
        
        var skills = ['Vanilla JS', 'ES6', 'Node.js', 'Express', 'Socket.io', 'React', 'Redux', 'Bootstrap', 'Material UI', 'MongoDB', 'MySQL', 'PostgreSQL', 'Python', 'Django', 'Flask', 'Docker', 'Ansible', 'AWS', 'Server Administration', 'NumPy', 'Pandas', 'Sklearn', 'Matplotlib', 'Hadoop', 'MapReduce'];

        return (
            <div>
                <p>{skills.join(", ")}</p>
            </div>
        )
    }
    
    renderEducation() {
        return (
            <div>
                <li className="list-group-item">
                    <p><strong>B.Tech., Computer Science, Shiv Nadar University</strong><br />Graduating 2019</p>
                </li>
            </div>
        )
    }

    renderShowcase() {
        return (
            <div>
                <li className="list-group-item">
                    <p>No Project to show.</p>
                </li>
            </div>
        )
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

    render() {

        if(this.props.authenticated) {
            return(
                <div>
                    <NavBarChange />
                    <div className="profile-page">
                        <div className="page-header header-filter" data-parallax="true" style={{ backgroundImage: "url('')" }}></div>
                        <div className="main main-raised">
                            <div className="profile-content">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-6 ml-auto mr-auto">
                                            <div className="profile">
                                                <div className="avatar">
                                                    <img src="https://farm6.staticflickr.com/5612/15524972807_974a36b105_b.jpg" alt="Circle Image" className="img-raised rounded-circle img-fluid" />
                                                </div>
                                                <div className="name">
                                                    <h3 className="title">{`${localStorage.getItem('name')}`}</h3>
                                                    <h6>Full Stack Web Developer</h6>
                                                    <a href="#pablo" className="btn btn-just-icon btn-link btn-dribbble"><i className="fa fa-twitter"></i></a>
                                                    <a href="#pablo" className="btn btn-just-icon btn-link btn-twitter"><i className="fa fa-github"></i></a>
                                                    <a href="#pablo" className="btn btn-just-icon btn-link btn-pinterest"><i className="fa fa-linkedin"></i></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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
                                    </div>
                                    <div className="description text-center">
                                        <p>A Full Stack JavaScript Developer passionate about building things, skilled in Node.js, React, Express, MongoDB, Socket.io, Redux etc. </p>
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
                                                            <button className="btn btn-sm btn-success">Add Experience</button>
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
                                                            <button className="btn btn-sm btn-warning">Add Skills</button>
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
                                                            <button className="btn btn-sm btn-danger">Add Education</button>
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
                                                            <button className="btn btn-sm btn-success">Add Project</button>
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
                                                            <button className="btn btn-sm btn-success">Find a Job</button>
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
                </div>
            );
        }

        else {
            return (
                <Redirect to={`/login?next=${this.props.location.pathname}`}/>
            );
        }
    };
}

function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps, null)(UserProfile);