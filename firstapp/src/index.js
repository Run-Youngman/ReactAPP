import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {store,store2} from './mobx_store';

if (process && process.env && process.env.NODE_ENV === "development") {
    //开发环境
    require('./dev_config');
} else {
    require('./prod_config');
}

ReactDOM.render(<App store={store} />, document.getElementById('root'));
registerServiceWorker();
