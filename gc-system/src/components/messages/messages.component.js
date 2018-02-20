import React, {Component} from 'react';
import './messages.component.css';

class MessagesComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'empty',
            message: null,
        };
        this._signClasses = new Map()
            .set('info-message', 'fa fa-exclamation fa-2x')
            .set('error-message', 'fa fa-times-circle fa-2x');
    }

    close() {
        this.setState({
            type: 'empty'
        })
    }

    render() {
        const display = {
            display: this.state.type != 'empty' ? 'block' : 'none',
        };
        return (
            <div className={'message-container ' + this.state.type} style={display}>
                <div>
                    <span className="message-middle-row message-sign">
                        <i className={this._signClasses.get(this.state.type)} aria-hidden="true"></i>
                    </span>
                    <span className="message-middle-row message-content">
                        {this.props.message}
                    </span>
                    <span className="message-middle-row message-close" aria-hidden="true"
                          onClick={() => this.close()}>
                        <i className="fa fa-times fa-2x" aria-hidden="true"></i>
                    </span>
                </div>
            </div>
        );
    }
}

export default MessagesComponent;