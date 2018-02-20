import React, {Component} from 'react';
import './header.certificate.component.css';

class HeaderCertificateComponent extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="certificate-view-left-right-padding certificate-view-header">
                <span className="certificate-view-header-middle-row certificate-view-title">{this.props.name}</span>
                <span className="certificate-view-header-middle-row certificate-view-date">{this.props.date}</span>
            </div>
        );
    }
}

export default HeaderCertificateComponent;