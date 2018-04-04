import React, { Component } from 'react';
import { connect } from 'react-redux';

class JobSearchBar extends Component {

    render() {
        
        return(
            <form>
                <div class="input-group">
                    <div class="input-group-prepend">
                        <span class="input-group-text">
                            <i class="material-icons">search</i>
                        </span>
                    </div>
                    <input type="text" class="form-control" placeholder="Job Search" />
                </div>
            </form>
        )
    }
}

export default JobSearchBar;