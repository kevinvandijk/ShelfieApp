import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import Router from './router';

export default class App extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  }

  componentWillMount() {
    console.tron('App boot'); //eslint-disable-line
  }

  render() {
    return (
      <Provider store={ this.props.store }>
        <Router />
      </Provider>
    );
  }
}
