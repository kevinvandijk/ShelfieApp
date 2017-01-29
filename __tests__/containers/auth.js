import 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import AuthContainer from '../../app/containers/auth';
import configureStore from '../../app/store/configure-store';

jest.mock('../../app/lib/i18n');

describe('<AuthContainer>', () => {
  it('renders', () => {
    renderer.create(
      <Provider store={ configureStore() }>
        <AuthContainer />
      </Provider>
    );
  });
});
