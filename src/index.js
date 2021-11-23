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
import speciesReducers from './store/reducer/species';
import groupsReducers from './store/reducer/groups';
import ordersReducers from './store/reducer/orders';
import creaturesCategoriesReducers from './store/reducer/creaturesCategories';
import familiesReducer from './store/reducer/families';
import creaturesReducer from './store/reducer/creatures';
import footprintReducer from './store/reducer/footprint';
import timberSampleReducer from './store/reducer/timberSample';
import feedbacksRedecer from './store/reducer/feedbacks';
import questionReducer from './store/reducer/questions';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  posts: postsReducer,
  category: categoryReducer,
  auth: authReducer,
  loader: loaderReducer,
  listImages: listImagesReducer,
  listUsers: listUsers,
  species: speciesReducers,
  groups: groupsReducers,
  orders: ordersReducers,
  creaturesCategories: creaturesCategoriesReducers,
  families: familiesReducer,
  creatures: creaturesReducer,
  footprints: footprintReducer,
  timberSample: timberSampleReducer,
  feedbacks: feedbacksRedecer,
  questions: questionReducer
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

