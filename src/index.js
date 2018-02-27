import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import './index.css';
import App from './App';
import recipes from './store/reducers/recipes';
import filters from './store/reducers/filters';

import registerServiceWorker from './registerServiceWorker';

const rootReducer = combineReducers({
    recipes,
    filters
});

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
