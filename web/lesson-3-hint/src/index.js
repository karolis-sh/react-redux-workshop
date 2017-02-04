import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

import {loadBooks} from './actions/book';
import {loadEmployees} from './actions/employee';
import {init, store} from './config';
import App from './components/App';
import './index.css';


init(() => {
  store.dispatch(loadBooks());
  store.dispatch(loadEmployees());
});

const ReduxApp = () =>
  <Provider store={store}>
    <App />
  </Provider>;

render(<ReduxApp />, document.getElementById('root'));
