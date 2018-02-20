import React, {Component} from 'react';
import './App.css';
import './components/components.css';
import 'font-awesome/css/font-awesome.min.css';

import {IntlProvider} from 'react-intl';
import Messages from './i18n/messages';

import NavComponent from './components/nav/nav.component';
import MessagesComponent from './components/messages/messages.component';
import TitleComponent from './components/title/title.component';
import MainComponent from './components/main/main.component';
import FooterComponent from './components/footer/footer.component';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lang: this.retrieveLanguage(),
        };
    }

    retrieveLanguage(){
        return sessionStorage.getItem('lang') || 'en';
    }

    changeLanguage(lang) {
        sessionStorage.setItem('lang', lang);
    }

    render() {
        return (
            <IntlProvider locale={this.state.lang} messages={Messages[this.state.lang]}>
                <div className="body-wrapper">
                    <NavComponent className="common-body-component nav-component-section"
                                  changeLanguage={this.changeLanguage}/>
                    <MessagesComponent className="common-body-component message-component-section"
                                       message="Info message"/>
                    <div className="main-component-section main-component-section-padding">
                        <TitleComponent className="common-body-component"/>
                        <MainComponent className="common-body-component"/>
                    </div>
                    <FooterComponent className="common-body-component footer-component-section"/>
                </div>
            </IntlProvider>
        );
    }
}

export default App;