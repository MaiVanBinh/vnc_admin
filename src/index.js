import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import 'bootstrap/dist/css/bootstrap.min.css';

import postsReducer from './store/reducer/posts';
import categoryReducer from './store/reducer/category';
import authReducer from './store/reducer/auth';
import loaderReducer from './store/reducer/loader';
import listImagesReducer from './store/reducer/listImages';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  posts: postsReducer,
  category: categoryReducer,
  auth: authReducer,
  loader: loaderReducer,
  listImages: listImagesReducer
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

