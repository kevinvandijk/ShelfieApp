import React, { Component } from 'react';
import { func, string } from 'prop-types';
import { omit } from 'lodash';

export default class SubmitButton extends Component {
  static propTypes = {
    name: string.isRequired,
    type: string.isRequired,
    component: func.isRequired
  }

  static defaultProps = {
    type: 'button'
  }

  static contextTypes = {
    attachToForm: func,
    detachFromForm: func,
    submitForm: func
  }

  componentWillMount() {
    if (this.context.attachToForm) {
      this.context.attachToForm(this);
    }
  }

  componentWillUnmount() {
    if (this.context.detachFromForm) {
      this.context.detachFromForm(this);
    }
  }

  onPress = () => {
    if (this.context.submitForm) {
      this.context.submitForm();
    }
  }

  render() {
    const props = {
      ...omit(this.props, ['name', 'component']),
      onPress: this.onPress
    };

    return (
      <this.props.component { ...props } />
    );
  }
}
