import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'mobx-react';
import rootStore from './rootStore';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider rootStore={rootStore}>
        <App />
    </Provider>
    ,
    document.getElementById('root')
);
registerServiceWorker();
