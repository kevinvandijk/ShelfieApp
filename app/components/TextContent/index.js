import React from 'react';
import { oneOfType, string, object, number } from 'prop-types';
import { Text } from 'react-native';
import I18n from '../../lib/i18n';
import styles from './styles';

const TextContent = (props) => {
  const text = (props.i18nKey
    ? I18n.t(props.i18nKey, props.i18nValues)
    : props.children
  );

  return <Text style={ [styles.text, props.style] }>{ text }</Text>;
};

const textValidationError = 'Prop `i18nKey` or a plaintext child is required in `TextContent`.';

const validateTextPresence = props => {
  return (!props.i18nKey && !props.children
    ? new Error(textValidationError)
    : null
  );
};

TextContent.propTypes = {
  i18nKey: validateTextPresence,
  i18nValues: object,
  children: oneOfType([string, validateTextPresence]),
  style: oneOfType([number, object])
};

export default TextContent;
