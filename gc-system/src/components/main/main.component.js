import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import CertificatesComponent from './certificates/certificates.component';
import LoginComponent from './login/login.component';

class Main extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={CertificatesComponent}/>
                    <Route path="/certificates" component={CertificatesComponent}/>
                    <Route path="/login" component={LoginComponent}/>
                </div>
            </Router>
        );
    }
}

export default Main;