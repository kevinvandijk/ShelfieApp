import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import Router from './router';

// Initializers
import i18nInitializer from './initializers/i18n';

i18nInitializer();

export default class App extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  }

  render() {
    return (
      <Provider store={ this.props.store }>
        <Router />
      </Provider>
    );
  }
}
