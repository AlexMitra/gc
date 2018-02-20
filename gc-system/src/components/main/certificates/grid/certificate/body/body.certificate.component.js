import React, {Component} from 'react';
import './body.certificate.component.css';

class BodyCertificateComponent extends Component {
    constructor(props) {
        super(props);
    }

    introduceTags() {
        return this.props.tags ? this.props.tags.map((tag, index) =>
            <span key={index}>
                <span className="certificate-view-tag" value={tag.name}
                      onClick={() => this.props.searchByTag(tag.name)}>{tag.name}</span>
            </span>
        ) : this.props.tags;
    }

    render() {
        const tags = this.introduceTags();
        return (
            <div className="certificate-view-left-right-padding certificate-view-body">
                {tags}
                <div className="certificate-view-description">{this.props.description}</div>
            </div>
        );
    }
}

export default BodyCertificateComponent;