import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import asyncComponent from './hoc/asyncComponent';
const AsyncSearch = asyncComponent(() => {
  return import('./pages/Search');
});
const AsyncHome = asyncComponent(() => {
  return import('./pages/Home');
});
const AsyncContact = asyncComponent(() => {
  return import('./pages/Contact');
});
const AsyncDocuments = asyncComponent(() => {
  return import('./pages/Documents');
});
const AsyncNationalParks = asyncComponent(() => {
  return import('./pages/NationalParks');
});


class App extends React.Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/" exact component={AsyncHome} />
          <Route path="/tra-cuu" component={AsyncSearch} />
          <Route path="/lien-he" component={AsyncContact} />
          <Route path="/tai-lieu" component={AsyncDocuments} />
          <Route path="/vuon-quoc-gia" component={AsyncNationalParks} />
          <Redirect to="/" />
        </Switch>
      </Layout>
      
    );
  }
}


export default App;
