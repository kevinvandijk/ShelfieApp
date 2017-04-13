import React, { PropTypes } from 'react';
import { WebView } from 'react-native';

const { string } = PropTypes;

const ShelfieWebView = (props) => {
  return (
    <WebView
      source={{ uri: props.uri }}
    />
  );
};

ShelfieWebView.propTypes = {
  uri: string.isRequired
};

export default ShelfieWebView;
