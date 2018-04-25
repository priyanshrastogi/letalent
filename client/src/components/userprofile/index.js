import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PublicProfile from './publicprofile';
import PrivateProfile from './privateprofile';
import { fetchUserProfile } from '../../actions';

class UserProfile extends Component {

    componentDidMount() {
        this.props.fetchUserProfile(this.props.match.params.username);
    }

    render() {

        const { userprofile, match } = this.props
        
        if(!userprofile || userprofile.username !== match.params.username) {
            return (
                <p className="text-center">Loading...</p>
            )
        }

        else if(userprofile.username === localStorage.getItem('username')) {
            return (
                <PrivateProfile />
            )
        }

        else {
            return (
                <PublicProfile />
            )
        }
    
    };
}

function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated, userprofile: state.userprofile };
}

export default connect(mapStateToProps, { fetchUserProfile })(UserProfile);