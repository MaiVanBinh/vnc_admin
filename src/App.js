import React from 'react';
import RouteConfig from './router/RouterConfig';
import { connect } from 'react-redux';
import { authCheckState } from './store//actions/index';
import Loader from './components/UI/Loader/Loader';

class App extends React.Component {
  componentWillMount() {
    this.props.onAuthCheckState()
  }
  render() {
    return (
      <>
        <RouteConfig />
        {this.props.loader ? <Loader /> : null}
      </>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    loader: state.loader
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onAuthCheckState: () => {
      dispatch(authCheckState());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
