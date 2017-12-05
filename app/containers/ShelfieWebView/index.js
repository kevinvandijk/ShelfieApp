import React from 'react';
import { string } from 'prop-types';
import { WebView } from 'react-native';

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
