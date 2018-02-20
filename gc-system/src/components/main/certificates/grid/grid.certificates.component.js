import React, {Component} from 'react';
import './grid.certificates.component.css';
import CertificateComponent from './certificate/certificate.component';

class GridCertificatesComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const certificates = this.props.certificates ? this.props.certificates.map((certif) =>
            <CertificateComponent key={certif.id}
                name={certif.name}
                date={certif.creationDate}
                tags={certif.tags}
                description={certif.description}
                price={certif.price}
                searchByTag={this.props.searchByTag}
            />
        ) : this.props.certificates;

        return (
            <div className="certificates-content-container">
                {certificates}
            </div>
        );
    }
}

export default GridCertificatesComponent;