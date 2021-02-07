import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";

import postsReducer from './store/reducer/posts';
import categoryReducer from './store/reducer/category';
import authReducer from './store/reducer/auth';
import loaderReducer from './store/reducer/loader';
import listImagesReducer from './store/reducer/listImages';
import listUsers from './store/reducer/listUsers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  posts: postsReducer,
  category: categoryReducer,
  auth: authReducer,
  loader: loaderReducer,
  listImages: listImagesReducer,
  listUsers: listUsers
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <HashRouter basename="/">
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);

