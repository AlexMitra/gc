import React, {Component} from 'react';
import './login.component.css';
import FormLoginComponent from './form/form.login.component';
import ImageLoginComponent from './image/image.login.component';

class LoginComponent extends Component {
    render(){
        return(
            <div className="login-body-container main-component-section">
                <div className="login-content-row-middle login-form-container component-with-shadow">
                    <FormLoginComponent/>
                </div>
                <ImageLoginComponent/>
            </div>
        );
    }
}

export default LoginComponent;