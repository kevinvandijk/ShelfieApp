import React, { Component } from 'react';
import { node, func, oneOfType, number, object, bool } from 'prop-types';
import { View } from 'react-native';
import { mapValues, omitBy } from 'lodash';

export default class Form extends Component {
  static propTypes = {
    children: node.isRequired,
    style: oneOfType([number, object]),
    validate: func,
    onSubmit: func,
    onChange: func,
    validateOnChange: bool
  }

  static defaultProps = {
    validateOnChange: false
  }

  static childContextTypes = {
    attachToForm: func,
    detachFromForm: func,
    submitForm: func,
    onChange: func,
    focusOnNextField: func
  }
  constructor(props) {
    super(props);

    this.inputs = {};
  }

  getChildContext() {
    return {
      attachToForm: this.attachToForm,
      detachFromForm: this.detachFromForm,
      onChange: this.onChange,
      submitForm: this.submitForm,
      focusOnNextField: this.focusOnNextField
    };
  }

  onChange = () => {
    const { validate, onChange, validateOnChange } = this.props;
    if (onChange && validateOnChange) {
      const values = this.getValues();
      onChange(values, validate ? validate(values) : undefined);
    } else if (onChange) {
      onChange(this.getValues());
    }
  }

  getValues() {
    // Loop through inputs and filter out components that don't have getValue function
    return omitBy(
      mapValues(this.inputs, (component) => (component.getValue ? component.getValue() : false)),
      (value) => value === false
    );
  }

  attachToForm = (component) => {
    const name = component.props.name;
    if (this.inputs[name]) {
      console.warn(`Input or button with '${name} was already attached to this form`); // eslint-disable-line
    }
    this.inputs[name] = component;
  }

  detachFromForm = (component) => {
    delete this.inputs[component.props.name];
  }

  submitForm = () => {
    const { onSubmit, validate } = this.props;
    if (onSubmit) {
      const values = this.getValues();
      onSubmit(values, validate ? validate(values) : undefined);
    }
  }

  focusOnNextField = (component) => {
    const inputNames = Object.keys(this.inputs);
    const index = inputNames.indexOf(component.props.name);
    for (let i = index; i < inputNames.length; i++) {
      const nextField = this.inputs[inputNames[index + 1]];
      if (nextField && nextField.focus) {
        nextField.focus();
        break;
      }
    }
  }

  render() {
    return (
      <View style={ [{ flex: 1 }, this.props.style] }>
        { this.props.children }
      </View>
    );
  }
}
