import React, {Component} from 'react';
import './title.component.css';
import { FormattedMessage } from 'react-intl';

class TitleComponent extends Component{
    render(){
        return(
            <div className="certificates-title-container">
                <FormattedMessage id="SITE_TITLE" defaultMessage="Gift certificates shop"/>
            </div>
        );
    }
}

export default TitleComponent;