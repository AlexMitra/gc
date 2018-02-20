import React, {Component} from 'react';
import HeaderCertificateComponent from './header/header.certificate.component';
import BodyCertificateComponent from './body/body.certificate.component';
import FooterCertificateComponent from './footer/footer.certificate.component';

class CertificateComponent extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="component-with-shadow certificate-container">
                <HeaderCertificateComponent
                    name={this.props.name}
                    date={this.props.date}/>
                <BodyCertificateComponent
                    tags={this.props.tags}
                    description={this.props.description}
                    searchByTag={this.props.searchByTag}/>
                <FooterCertificateComponent
                    price={this.props.price}/>
            </div>
        );
    }
}

export default CertificateComponent;