import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'react-native';

import FormController from './FormController';
import validate from 'validate.js';

class Form extends Component {

  static propTypes = {
    ...View.propTypes,
    style: PropTypes.any,
    data: PropTypes.object,
    onSubmit: PropTypes.func,
    onValidate: PropTypes.func,
    onError: PropTypes.func,
    name: PropTypes.string,
    children: PropTypes.any,
    validations: PropTypes.object,
    customValidators: PropTypes.object,
    validationsExtend: PropTypes.object,
  };

  static defaultProps = {
    style: {},
    data: {},
    onSubmit: () => {},
    onValidate: () => {},
    onError: () => {},
    validations: {},
    customValidators: {},
  };

  static contextTypes = {
    formController: FormController,
  };

  static childContextTypes = {
    getParentFormName: PropTypes.func,
    registerInput: PropTypes.func,
    focus: PropTypes.func,
    submit: PropTypes.func,
    getInput: PropTypes.func,
    getLayoutMeasure: PropTypes.func,
  };

  getChildContext() {
    return {
      getParentFormName: () => this.name,
      registerInput: this._registerInput,
      focus: this.focus,
      submit: this.submit,
      getInput: (name) => this.inputs[name],
      getLayoutMeasure: () => this._layout,
    };
  }

  componentWillMount() {
    this.name = this.props.name || this.context.formController.makeName();
    this.inputs = {};
  }

  componentDidMount() {
    this.setData(this.props.data);
  }

  componentWillReceiveProps() {
    this.setData(this.props.data);
  }

  componentWillUnmount() {
    this.context.formController.unregisterForm(this.name);
  }

  setData = (data) => {
    Object.keys(data).forEach(name => {
      if (this.inputs[name] !== undefined) {
        this.inputs[name].setValue(data[name]);
      }
    });
  };

  getData = (validateData = true) => {
    const data = {};
    Object.keys(this.inputs).forEach(name => {
      data[name] = this.inputs[name].getValue();
    });

    if (validateData) {
      if (!this.validateFields(Object.keys(this.inputs))) {
        return null;
      }
    }

    return data;
  };

  getName = () => this.name;

  getFields = () => Object.keys(this.inputs);

  focus = (field) => {
    if (this.inputs[field]) {
      this.inputs[field].focus();
    }
  };

  blur = (field) => this.inputs[field] || this.inputs[field].blur();

  submit = (validateFields = true) => {
    this.props.onSubmit(this.getData(validateFields));
  };

  validateField = (field) => this.validateFields([field]);

  validateFields = (fields) => {
    if (this.props.validations) {
      const validations = {};
      const data = {};
      fields.forEach(field => {
        validations[field] = this.props.validations[field];
        data[field] = this.inputs[field].getValue();
      });
      Object.assign(validate.validators, this.props.customValidators);
      if (this.props.validationsExtend) {
        Object.keys(this.props.validationsExtend).forEach(key => {
          validate.extend(validate.validators[key], this.props.validationsExtend[key]);
        });
      }


      const validationResult = validate(data, validations);
      const validFields = validationResult
        ? fields.filter(x => Object.keys(validationResult).indexOf(x) < 0)
        : fields;

      validFields.forEach(field => {
        if (this.inputs[field]) {
          this.inputs[field].validate();
        }
      });

      if (validationResult) {
        Object.keys(validationResult).forEach(field => {
          this.invalidateField(field, validationResult[field][0]);
        });

        this.props.onError(validationResult);
        this.props.onValidate(false);
        return false;
      }
    }

    this.props.onValidate(true);
    return true;
  };

  invalidateField(field, message) {
    if (this.inputs[field]) {
      this.inputs[field].invalidate(message);
    }
  }

  hideKeyboard() {
    Object.keys(this.inputs).forEach(field => {
      this.inputs[field].blur();
    });
  }

  _register = (ref) => {
    this.context.formController.registerForm(this.name, {
      ref,
      onSubmit: this.onSubmit,
      onValidate: this.onValidate,
      inputs: this.inputs,
    });
  };

  _registerInput = (name, hooks) => {
    this.inputs[name] = hooks;
  };

  _measures = e => {
    this._layout = e.nativeEvent.layout;
  };

  render() {
    return (
      <View style={[{ flex: 1 }, this.props.style]} ref={this._register} onLayout={this._measures}>
        {this.props.children}
      </View>
    );
  }
}

export default Form;
