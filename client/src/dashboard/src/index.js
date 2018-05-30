//react
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

//redux
import {Provider} from "react-redux"
import store from "./store"
import {IntlProvider} from 'react-intl';

//antd
// import LocaleProvider from 'antd/lib/locale-provider';
// import frFR from 'antd/lib/locale-provider/fr_FR';

//global
import {lang} from './global';

ReactDOM.render(
    <Provider store={store}>
        {/*<LocaleProvider locale={frFR}>*/}
        <IntlProvider
            locale={'en'}
            messages={lang}>
            <App />
        </IntlProvider>
        {/*</LocaleProvider>*/}
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();
