import React from 'react';
import ReactDOM from 'react-dom';
import AppLayout from './appLayout';
import { Provider } from 'mobx-react';
import rootStore from './rootStore';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider rootStore={rootStore}>
        <AppLayout />
    </Provider>
    ,
    document.getElementById('root'));
registerServiceWorker();
