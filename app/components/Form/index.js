import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
const { node, func, oneOfType, number, object } = PropTypes;
import { mapValues, omitBy } from 'lodash';

export default class Form extends Component {
  static propTypes = {
    children: node.isRequired,
    style: oneOfType([number, object]),
    validate: func,
    onSubmit: func,
    onChange: func
  }

  static childContextTypes = {
    attachToForm: func,
    detachFromForm: func,
    submitForm: func,
    onChange: func
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
      submitForm: this.submitForm
    };
  }

  onChange = () => {
    const { validate, onChange } = this.props;
    if (onChange) {
      const values = this.getValues();
      onChange(values, validate ? validate(values) : undefined);
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

  render() {
    return (
      <View style={ [{ flex: 1 }, this.props.style] }>
        { this.props.children }
      </View>
    );
  }
}
