import React, { Component } from 'react';
import NavBarChange from './navbarchange';

class Page404 extends Component {

    render() {

        return (
            <div>
                <NavBarChange />
                <div class="signup-page">
                    <div class="page-header header-filter" filter-color="purple" style={{ backgroundImage: "url(&apos;../assets/img/kit/free/bg7.jpg&apos;)" }}>
                        <div class="container">
                            <div class="row">
                                <div class="col-md-10 ml-auto mr-auto">
                                    <div class="card card-signup">
                                        <h1 class="card-title text-center">404</h1>
                                        <div class="card-body text-center">
                                            <h3>Page Not Found!</h3>
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

export default Page404;