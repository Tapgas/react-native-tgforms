import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import FormController from './FormController';
import styles from './Styles';

let nextID = 0;

class FormContext extends Component {

  static propTypes = {
    detectBackAndroid: PropTypes.bool,
    style: PropTypes.any,
    children: PropTypes.any,
  };

  static defaultProps = {
    detectBackAndroid: true,
  };

  static childContextTypes = {
    formController: FormController,
  };

  state = {
    openedPopup: false,
  };

  getChildContext() {
    return {
      formController: {
        registerForm: this.registerForm,
        unregisterForm: this.unregisterForm,
        makeName: this.makeName,
      },
    };
  }

  componentWillMount() {
    this._forms = {};
  }

  registerForm = (name, hooks) => {
    if (this._forms[name]) {
      console.warn(`Form ${name} has already been registered in this context. Please provide a different name.`);
    }

    this._forms[name] = { inputs: {}, ...hooks };
  };

  unregisterForm = (name) => {
    delete this._forms[name];
  };

  makeName() {
    return `form_${nextID++}`;
  }

  render() {
    return (
      <View ref="Container" style={{ flex: 1 }}>
        <View style={this.props.style}>
          {this.props.children}
        </View>
      </View>
    );
  }
}

export default FormContext;
