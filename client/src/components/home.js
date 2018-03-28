import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavBarChange from './navbarchange';
import homeImage from '../img/home.jpg';

class Home extends Component {

    render() {
        
        return(
            <div>
            <NavBarChange />
                <div className="page-header header-filter" data-parallax="true" style={{ backgroundImage: `url(${homeImage})` }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <h1 className="title">The Talent Marketplace</h1>
                            <h4>Get your work done by Top Talent or Offer your talent and make money.</h4>
                            <br />
                            <Link to="/jobs/new" className="btn btn-danger btn-raised btn-lg">Post A Job</Link>
                            <strong> OR </strong>
                            <Link to="/jobs" className="btn btn-success btn-raised btn-lg">Find Freelance Jobs</Link>
                        </div>
                    </div>
                </div>
            </div>
                <div className="main main-raised">
                    <div className="container">
                        <div className="section text-center">
                            <div className="row">
                                <div className="col-md-8 ml-auto mr-auto">
                                    <h2 className="title">Get your work done</h2>
                                    <h5 className="description"></h5>
                                </div>
                            </div>
                            <div className="features">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="info">
                                            <div className="icon icon-success">
                                                <i className="material-icons">verified_user</i>
                                            </div>
                                            <h4 className="info-title">Verified Freelancers</h4>
                                            <p>All the Freelancers on Letalent are verified since we carefully review each application and choose only best talent for you.</p>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="info">
                                            <div className="icon icon-danger">
                                                <i className="material-icons">update</i>
                                            </div>
                                            <h4 className="info-title">Real-time</h4>
                                            <p>Post a Job, Get proposals from Freelancers, Review and Select the Freelancer suits best for your needs, keep track of progress with Real-time chat.</p>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="info">
                                            <div className="icon icon-info">
                                                <i className="material-icons">security</i>
                                            </div>
                                            <h4 className="info-title">Secure Payments</h4>
                                            <p>Your Cards are secure with us. We use 256-bit encryption layer for your Card and Payment Data.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="section text-center">
                            <div className="row">
                                <div className="col-md-8 ml-auto mr-auto">
                                    <h2 className="title">Offer your talent</h2>
                                    <h5 className="description"></h5>
                                </div>
                            </div>
                            <div className="features">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="info">
                                            <div className="icon icon-info">
                                                <i className="material-icons">person_add</i>
                                            </div>
                                            <h4 className="info-title">Easy Sign Up</h4>
                                            <p>Offering your talent with Letalent is easy. Just Sign Up, Add Information, Submit Your Profile for Review and once Verified, you are good to go.</p>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="info">
                                            <div className="icon icon-danger">
                                                <i className="material-icons">trending_up</i>
                                            </div>
                                            <h4 className="info-title">Grow</h4>
                                            <p>Compete with top talent and improve your skills. Learn new things, take the Jobs and make money.</p>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="info">
                                            <div className="icon icon-success">
                                                <i className="material-icons">swap_horiz</i>
                                            </div>
                                            <h4 className="info-title">Easy Money Transfer</h4>
                                            <p>Transferring money from your Wallet to your bank account is easy. Just in one click you can transfer money from wallet to bank account.</p>
                                        </div>
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

export default Home;
