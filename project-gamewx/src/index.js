import React from 'react';
import ReactDOM from 'react-dom';
import AppLayout from './appLayout';
import { Provider } from 'mobx-react'
import registerServiceWorker from './registerServiceWorker';
import rootStore from './rootStore';

ReactDOM.render(
    <Provider rootStore={rootStore}>
        <AppLayout />
    </Provider>
    ,
    document.getElementById('root'));
registerServiceWorker();
