import React from 'react';
import ReactDOM from 'react-dom';
//import { Router, Route, browserHistory } from 'react-router';
import createHashHistory from 'history/lib/createHashHistory';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux'
import {createStore, applyMiddleware, combineReducers, compose} from "redux";
import {Provider} from 'react-redux'
import {workflowItems} from './reducers/workflow-items';
import {App} from './components/app';
//import routes from "./routes/routes";
import thunk from "redux-thunk";
//import reduxApi from "./api/rest";
//import adapterFetch from "redux-api/lib/adapters/fetch";

//reduxApi.use("fetch", adapterFetch(fetch));
const reducer = combineReducers({workflowItems});
const finalCreateStore = applyMiddleware(thunk)(createStore);
const initialState = window.$REDUX_STATE;
const store = initialState
  ? finalCreateStore(reducer, initialState)
  : finalCreateStore(reducer);

//const childRoutes = routes(store);
// Create an enhanced history that syncs navigation events with the store
//const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render((
  <Provider store={store}>
    <App/>
  </Provider>
), document.getElementById('root'));
