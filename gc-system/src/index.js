import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import ru from 'react-intl/locale-data/ru';

addLocaleData(en);
addLocaleData(ru);


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
