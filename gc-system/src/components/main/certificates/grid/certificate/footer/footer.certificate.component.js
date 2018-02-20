import React, {Component} from 'react';
import './footer.certificate.component.css';

import {FormattedMessage} from 'react-intl';

class FooterCertificateComponent extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="certificate-view-left-right-padding certificate-view-footer">
                <span className="certificate-view-footer-element-container">
                        <button className="certificate-view-footer-middle-row certificate-footer-button">
                            <FormattedMessage id="CERTIFICATES_EDIT_BUTTON" defaultMessage="Edit"/>
                        </button>
                </span>
                <span className="certificate-view-footer-element-container">
                        <button className="certificate-view-footer-middle-row certificate-footer-button">
                            <FormattedMessage id="CERTIFICATES_DELETE_BUTTON" defaultMessage="Delete"/>
                        </button>
                </span>
                <span className="certificate-view-footer-element-container">
                        <button className="certificate-view-footer-middle-row certificate-footer-button">
                            <FormattedMessage id="CERTIFICATES_BUY_BUTTON" defaultMessage="Buy"/>
                        </button>
                </span>
                <span className="certificate-view-footer-element-container align-right">
                        <span className="certificate-view-footer-middle-row certificate-view-footer-price">
                            ${this.props.price}
                        </span>
                </span>
            </div>
        );
    }
}

export default FooterCertificateComponent;