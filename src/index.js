import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";

import creaturesReducer from "./store/reducer/creatures";
import postsReducer from './store/reducer/posts';
import speciesReducer from './store/reducer/species';
import categoryReducer from './store/reducer/category';
import nationalParkReducer from './store/reducer/nationalParks';
import authorReducer from './store/reducer/author';
import latinDicReducer from './store/reducer/latinDic';
import authReducer from './store/reducer/auth';
import groupsReducer from './store/reducer/groups';
import ordersReducer from './store/reducer/orders';
import familiesReducer from './store/reducer/families';
import assetsReducer from './store/reducer/assets';
import usersReducer from './store/reducer/users';
import woodReducer from './store/reducer/wood';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  creatures: creaturesReducer,
  posts: postsReducer,
  species: speciesReducer,
  category: categoryReducer,
  nationalPark: nationalParkReducer,
  author: authorReducer,
  latinDic: latinDicReducer,
  auth: authReducer,
  groups: groupsReducer,
  orders: ordersReducer,
  families: familiesReducer,
  assets: assetsReducer,
  users: usersReducer,
  woods: woodReducer
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
