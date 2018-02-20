import React, {Component} from 'react';
import './form.login.component.css';
import {FormattedMessage} from 'react-intl';
//import axios from 'axios';
import jwt_decode from 'jwt-decode';


class FormLoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
        };
        this._usernamePattern = '^(([A-Za-zА-ЯЁа-яё_0-9/-]+)){4,30}$';
        this._passwordPattern = '^([A-Za-z0-9]){3,30}$';
        this._authenticationName = 'authentication';
    }

    handleUsernameChange = (e) => {
        this.setState({username: e.target.value});
    };

    isUsernameInvalid = () => {
        return this.state.username !== null && !this.state.username.match(this._usernamePattern);
    };

    handlePasswordChange = (e) => {
        this.setState({password: e.target.value});
    };

    isPasswordInvalid = () => {
        return this.state.password !== null && !this.state.password.match(this._passwordPattern);
    };

    login = () => {
        let url = 'https://localhost:8888/gift-certificate-system/oauth/token';

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': 'Basic dHJ1c3RlZC1jbGllbnQ6c3VwZXJfc2VjcmV0'
            }
        };

        let params = new URLSearchParams();
        params.append('grant_type', 'password');
        params.append('username', this.state.username);
        params.append('password', this.state.password);

        let Options = {
            method: 'OPTIONS',
            headers: {
                'Authorization': 'Basic dHJ1c3RlZC1jbGllbnQ6c3VwZXJfc2VjcmV0'
            }
        };

        fetch(url, Options);

        // let axio = axios.create({
        //     timeout: 10000,
        // });
        //
        // axio.post(url, params, config)
        //     .then((response) => {
        //         let accessToken = response.data.access_token;
        //         let decodedToken = jwt_decode(accessToken);
        //         let authentication = {
        //             accessToken: accessToken,
        //             name: decodedToken.user_name,
        //             role: decodedToken.authorities
        //         };
        //         localStorage.setItem(this._authenticationName, JSON.stringify(authentication));
        //         window.location.href = '/certificates';
        //     })
        //     .catch((error) => {
        //         alert('on reject');
        //         for (let i in error.response) {
        //             alert(i + ': ' + error.response[i]);
        //         }
        //
        //         if (error.response.status === 400) {
        //             document.getElementById('loginForm').reset();
        //             //this.userDoesNotExisted = true;
        //         }
        //         if (error.response.status === -1) {
        //             document.getElementById('loginForm').reset();
        //             //this.serverIsNotAvailable = true;
        //         }
        //         this.setState({
        //             username: '',
        //             password: '',
        //         });
        //     });

        // let data = {
        //     grant_type: 'password',
        //     username: this.state.username,
        //     password: this.state.password
        // };

        let fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Authorization': 'Basic dHJ1c3RlZC1jbGllbnQ6c3VwZXJfc2VjcmV0'
            },
            body: params
        };

        alert(JSON.stringify(fetchOptions));

        fetch(url, fetchOptions)
            .then(res => res.json())
            .then((json) => {
                alert('in success');
                let accessToken = json.access_token;
                let decodedToken = jwt_decode(accessToken);
                let authentication = {
                    accessToken: accessToken,
                    name: decodedToken.user_name,
                    role: decodedToken.authorities
                };
                localStorage.setItem(this._authenticationName, JSON.stringify(authentication));
                window.location.href = '/certificates';
            }).catch((ex) => {
            alert('parsing failed', ex);
        });
    };

    render() {
        const usernameErrorMsgDisplayed = {
            visibility: this.isUsernameInvalid() ? '' : 'hidden',
        };
        const passwordErrorMsgDisplayed = {
            visibility: this.isPasswordInvalid() ? '' : 'hidden',
        };

        return (
            <form id="loginForm" onSubmit={this.login}>
                <label className="form-row-element form-title">
                    <FormattedMessage id="LOGIN_FORM_USER_NAME" defaultMessage="Username*"/>
                </label>
                <FormattedMessage id="LOGIN_FORM_USER_NAME_PLACEHOLDER" defaultMessage="Enter your username">
                    {(msg) => <input className="form-row-element form-input" type="text" placeholder={msg}
                                     value={this.state.username} onChange={this.handleUsernameChange}
                                     required pattern={this._usernamePattern}/>}
                </FormattedMessage>
                <span className="form-row-element form-error-message" style={usernameErrorMsgDisplayed}>
                    <FormattedMessage id="LOGIN_FORM_UN_ERROR_MESSAGE" defaultMessage="Invalid username"/>
                </span>

                <label className="form-row-element form-title">
                    <FormattedMessage id="LOGIN_FORM_PASSWORD" defaultMessage="Password*"/>
                </label>
                <FormattedMessage id="LOGIN_FORM_PASSWORD_PLACEHOLDER" defaultMessage="Enter your password">
                    {(msg) => <input className="form-row-element form-input" type="password" placeholder={msg}
                                     value={this.state.password} onChange={this.handlePasswordChange}
                                     required pattern={this._passwordPattern}/>}
                </FormattedMessage>
                <span className="form-row-element form-error-message" style={passwordErrorMsgDisplayed}>
                    <FormattedMessage id="LOGIN_FORM_PASS_ERROR_MESSAGE" defaultMessage="Invalid password"/>
                </span>

                <div className="form-row-element login-buttons-container">
                    <FormattedMessage id="LOGIN_FORM_LOGIN_BTN" defaultMessage="Login">
                        {(msg) => <input type="submit" className="login-form-button form-right-margin-10-percents"
                                         value={msg}/>}
                    </FormattedMessage>

                    <button className="login-form-button form-left-margin-10-percents">
                        <FormattedMessage id="LOGIN_FORM_CANCEL_BTN" defaultMessage="Cancel"/>
                    </button>
                </div>
            </form>
        );
    }
}

export default FormLoginComponent;