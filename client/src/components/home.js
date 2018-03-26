import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NavBarChange from './navbarchange';
import homeImage from '../img/home.jpg';

class Home extends Component {

    render() {
        
        return(
            <div>
            <NavBarChange />
                <div class="page-header header-filter" data-parallax="true" style={{ backgroundImage: `url(${homeImage})` }}>
                <div class="container">
                    <div class="row">
                        <div class="col-md-8">
                            <h1 class="title">The Talent Marketplace</h1>
                            <h4>Get your work done by Top Talent or Offer your talent and make money.</h4>
                            <br />
                            <Link to="/signup" class="btn btn-danger btn-raised btn-lg">Post A Job</Link>
                            <strong> OR </strong>
                            <Link to="/signup" class="btn btn-success btn-raised btn-lg">Find Freelance Jobs</Link>
                        </div>
                    </div>
                </div>
            </div>
                <div class="main main-raised">
                    <div class="container">
                        <div class="section text-center">
                            <div class="row">
                                <div class="col-md-8 ml-auto mr-auto">
                                    <h2 class="title">Get your work done</h2>
                                    <h5 class="description"></h5>
                                </div>
                            </div>
                            <div class="features">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="info">
                                            <div class="icon icon-success">
                                                <i class="material-icons">verified_user</i>
                                            </div>
                                            <h4 class="info-title">Verified Freelancers</h4>
                                            <p>All the Freelancers on Letalent are verified since we carefully review each application and choose only best talent for you.</p>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="info">
                                            <div class="icon icon-danger">
                                                <i class="material-icons">update</i>
                                            </div>
                                            <h4 class="info-title">Real-time</h4>
                                            <p>Post a Job, Get proposals from Freelancers, Review and Select the Freelancer suits best for your needs, keep track of progress with Real-time chat.</p>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="info">
                                            <div class="icon icon-info">
                                                <i class="material-icons">security</i>
                                            </div>
                                            <h4 class="info-title">Secure Payments</h4>
                                            <p>Your Cards are secure with us. We use 256-bit encryption layer for your Card and Payment Data.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="section text-center">
                            <div class="row">
                                <div class="col-md-8 ml-auto mr-auto">
                                    <h2 class="title">Offer your talent</h2>
                                    <h5 class="description"></h5>
                                </div>
                            </div>
                            <div class="features">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="info">
                                            <div class="icon icon-info">
                                                <i class="material-icons">person_add</i>
                                            </div>
                                            <h4 class="info-title">Easy Sign Up</h4>
                                            <p>Offering your talent with Letalent is easy. Just Sign Up, Add Information, Submit Your Profile for Review and once Verified, you are good to go.</p>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="info">
                                            <div class="icon icon-danger">
                                                <i class="material-icons">trending_up</i>
                                            </div>
                                            <h4 class="info-title">Grow</h4>
                                            <p>Compete with top talent and improve your skills. Learn new things, take the Jobs and make money.</p>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="info">
                                            <div class="icon icon-success">
                                                <i class="material-icons">swap_horiz</i>
                                            </div>
                                            <h4 class="info-title">Easy Money Transfer</h4>
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
