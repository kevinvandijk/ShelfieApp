import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { userIsAuthenticated } from '../modules/auth';
const { bool } = PropTypes;

export default () => {
  return (WrappedComponent) => {
    const AuthenticatedComponent = (props) => {
      const showWrappedComponent = props.isAuthenticated;
      return (
        showWrappedComponent ? <WrappedComponent { ...props } /> : null
      );
    };

    AuthenticatedComponent.propTypes = {
      isAuthenticated: bool.isRequired
    };

    const mapStateToProps = (state) => {
      return {
        isAuthenticated: userIsAuthenticated(state),
      };
    };

    return connect(mapStateToProps)(AuthenticatedComponent);
  };
};
