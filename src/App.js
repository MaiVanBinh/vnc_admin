import React from 'react';
import './App.css';
import RouteConfig from './router/RouterConfig';
import {connect} from 'react-redux';
import { authCheckState } from './store//actions/index';

class App extends React.Component {
  componentWillMount() {
    this.props.onAuthCheckState()
  }
  render() {
    return (
      <RouteConfig />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthCheckState: () => {
      dispatch(authCheckState());
    },
  };
};

export default connect(null, mapDispatchToProps)(App);
