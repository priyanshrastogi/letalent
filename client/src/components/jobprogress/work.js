import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import _ from 'lodash';
import SubmitJobModal from './submitjobmodal';

class JobProgressWork extends Component {

    renderContent() {
        const { job } = this.props;

        if (job.status === 'started') {
            return (
                <div>
                    <h3 className="text-center title">{job.title}</h3>

                    <div className="row">
                        <div className="col-md-6">

                        </div>
                        <div className="col-md-6">

                        </div>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-success" data-toggle="modal" data-target="#submitJobModal">Submit Work</button>
                    </div>
                    <SubmitJobModal jobId={job._id} history={this.props.history}/>
                </div>
            )
        }

        else if (job.status === 'submitted') {
            return (
                <div>
                    <h3 className="text-center title">{job.title}</h3>
                    <div className="row">
                        <div className="col-md-6">

                        </div>
                        <div className="col-md-6">

                        </div>
                    </div>
                    <div className="text-center">
                    </div>
                </div>
            )
        }

        if (job.status === 'pending') {
            return (
                <div>
                    <h3 className="text-center title">{job.title}</h3>
                    <h3 className="text-center title">Job hasn't been started yet.</h3>
                </div>
            )
        }

    }

    render() {

        const { job } = this.props;

        return (
            <div>
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-8 offset-md-2" style={{ marginTop: '50px' }}>
                                {this.renderContent()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { };
}

export default connect(mapStateToProps, null)(JobProgressWork);