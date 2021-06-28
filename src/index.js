import React from 'react';
import ReactDOM from 'react-dom';
import {store} from './store/store';
import {Provider} from 'react-redux';
import Routes from './routes/routes';
import './assets/css/bootstrap.min.css';
import './assets/css/custom-nav.css';
import './assets/css/common.css';
import './assets/css/modal.css';
import './assets/css/subHeader.css';
import './assets/css/loaders.css';
import './assets/css/drawer.css';
import './assets/css/formCreator.css';
import './assets/css/multiple-select.css';
import './assets/css/report.css';
import './assets/css/step.css';
import './assets/css/bodysvg.css';
import './assets/css/analisysofcause.css';
import SweetAlert from './components/Common/SweetAlert';

ReactDOM.render(
        <Provider store={store}>
            <>
                <Routes />
                <SweetAlert/>
            </>
        </Provider>
    , document.getElementById('root'));