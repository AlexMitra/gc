import React, {Component} from 'react';
import './nav.component.css';
import {FormattedMessage} from 'react-intl';


class NavComponent extends Component {
    constructor(props) {
        super(props);

        this.userAuthenticated = false;
        this.username = null
        this.role = null;

        this.authenticationName = 'authentication';
        this.retrieveAuthentication();
    }

    retrieveAuthentication() {
        let authenticationJson = localStorage.getItem(this.authenticationName);
        // alert(authenticationJson);
        if (authenticationJson) {
            let authentication = JSON.parse(authenticationJson);
            // alert(authentication.name);
            // alert(authentication.role);

            this.userAuthenticated = true;
            this.username = authentication.name;
            this.role = authentication.role;
        }
    }

    logout() {
        localStorage.removeItem(this.authenticationName);
        this.userAuthenticated = false;
        this.username = null;
        this.role = null;
    }

    render() {
        //alert(JSON.stringify(this.state));
        const guestStyle = {
            visibility: this.userAuthenticated ? 'hidden' : ''
        };
        const userStyle = {
            visibility: this.userAuthenticated ? '' : 'hidden'
        };
        const adminStyle = {
            visibility: this.role == 'ROLE_ADMIN' ? '' : 'hidden'
        };
        return (
            <div className="nav-container">
                <div className="nav-row-middle nav-title">
                    <a className="nav-selected-link" href="/certificates">
                        <FormattedMessage id="NAV_CERTIFICATES" defaultMessage="Certificates"/>
                    </a>

                    <a className="nav-authorized-link margin-left-10" href="/certificates/add" style={adminStyle}>
                        <FormattedMessage id="NAV_ADD_CERTIFICATE" defaultMessage="Add new certificate"/>
                    </a>

                </div>
                <div className="nav-row-middle nav-localization">
                    <a className="nav-selected-link" href="" onClick={() => this.props.changeLanguage('ru')}>
                        <FormattedMessage id="NAV_LANGUAGE_RU" defaultMessage="RU"/>
                    </a>
                    /
                    <a className="nav-selected-link" href="" onClick={() => this.props.changeLanguage('en')}>
                        <FormattedMessage id="NAV_LANGUAGE_EN" defaultMessage="EN"/>
                    </a>
                </div>
                <div className="nav-row-middle nav-user-image" style={userStyle}>
                    <img className="nav-user-avatar" src="images/avatar.JPG"></img>
                </div>
                <div className="nav-row-middle nav-user-name margin-left-10" style={userStyle}>
                    <span>{this.username}</span>
                </div>
                <div className="nav-row-middle nav-menu">
                    <span style={guestStyle}>
                        <a className="nav-selected-link" href="/login">
                            <FormattedMessage id="NAV_LOGIN" defaultMessage="Login"/>
                        </a>
                        /
                        <a className="nav-selected-link" href="/sign-up">
                            <FormattedMessage id="NAV_SIGNUP" defaultMessage="Sign Up"/>
                        </a>
                    </span>
                    <span style={userStyle}>
                        <a className="nav-authorized-link" href="/login" onClick={() => this.logout()}>
                            <FormattedMessage id="NAV_LOGOUT" defaultMessage="Logout"/>
                        </a>
                    </span>
                </div>
            </div>
        );
    }
}

export default NavComponent;