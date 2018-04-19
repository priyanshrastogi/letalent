import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import NavBarDefault from '../navbardefault';
import PostProposalModal from '../postproposalmodal';

class JobAndProposalDetails extends Component {

    render() {
        return (
            <div>
                <NavBarDefault />
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-8 offset-md-2" style={{ marginTop: '50px' }}>
                                <h3 className="text-center title">Build A Personal Website</h3>
                            </div>
                        </div>
                        <div className="container">
                            <div style={{ marginBottom: '30px' }}>
                                <h4 className="title">Description</h4>
                                <p style={{ fontWeight: 400 }}>Hello There, Just Build My Website. It should have something like a good looking website. It should be dynamic and it should be really well. It should work. You should use React, Node and whatever the fuck you want but it just should work motherfuckers.</p>
                            </div>
                            <div style={{ marginBottom: '30px' }}>
                                <h4 className="title">Skills Required</h4>
                                <p style={{ fontWeight: 400 }}>Node.js, React, Redux, Web Development, Payment Integration</p>
                            </div>
                            <div style={{ marginBottom: '30px' }}>
                                <h4 className="title">Pay Type</h4>
                                <p style={{ fontWeight: 400 }}>Fixed Price</p>
                            </div>
                            <div style={{ marginBottom: '30px' }}>
                                <h4 className="title">Budget</h4>
                                <p style={{ fontWeight: 400 }}>INR 10,000 - 20,000</p>
                            </div>
                            <div>
                                <span className="text-danger" style={{ fontWeight: 400 }}>
                                    <i className="material-icons">local_offer</i> 5 Proposals, Avg. Proposal Price is INR 12,000
                                </span>
                            </div>
                            <div className="text-center">
                                <button className="btn btn-info" data-toggle="modal" data-target="#postProposalModal">Post A Proposal</button>
                            </div>
                            <PostProposalModal />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { errorMessage: state.auth.error, authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps, null)(JobAndProposalDetails);