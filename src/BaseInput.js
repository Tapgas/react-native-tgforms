import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import MaskService from './utils/mask-service';

import DatePicker from 'react-native-datepicker';
import SelectInput from './Select/SelectInput';
import moment from 'moment';

import styles from './Styles';

const types = [
  'text',
  'password',
  'email',
  'numeric',
  'textarea',
  'checkbox',
  'switch',
  'radio',
  'options',
  'phone',
  'date',
  'datetime',
  'time',
  'select',
];

const mapTypeToKeyboardType = {
  email: 'email-address',
  numeric: 'numeric',
  phone: 'phone-pad',
  text: 'default',
};

const FORMATS = {
  date: 'YYYY-MM-DD',
  datetime: 'YYYY-MM-DD HH:mm',
  time: 'HH:mm',
};

class BaseInput extends Component {

  static propTypes = {
    ...View.propTypes,
    ...TextInput.propTypes,
    ...DatePicker.propTypes,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
    ]),
    type: PropTypes.oneOf(types),
    numberOfLines: PropTypes.number,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    name: PropTypes.string.isRequired,
    TextInputStyle: PropTypes.number,
    next: PropTypes.string,
    confirmBtnText: PropTypes.string,
    cancelBtnText: PropTypes.string,
    datePickerStyle: PropTypes.any,
    empty: PropTypes.string,
    getDateStr: PropTypes.func,
  };

  static defaultProps = {
    ...TextInput.defaultProps,
    type: 'text',
    value: null,
    numberOfLines: 3,
    mask: false,
    showIcon: false,
    confirmBtnText: 'Accept',
    cancelBtnText: 'Cancel',
  };

  static contextTypes = {
    getParentFormName: PropTypes.func,
    registerInput: PropTypes.func,
    focus: PropTypes.func,
    submit: PropTypes.func,
    smartScroll: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: ['date', 'time', 'datetime'].indexOf(props.type) >= 0
        ? this.getDateStr()
        : null,
      error: null,
    };
  }

  onChangeText = (newValue) => {
    const { mask } = this.props;
    const value = mask
      ? MaskService.toMask('custom', newValue, { mask })
      : newValue;
    this.setState({ value });
    if (this.props.onChangeText) {
      this.props.onChangeText(value);
    }
  };

  onBlur = () => {
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  };

  onFocus = () => {
    if (this.context.smartScroll) {
      this.context.smartScroll(this.props.name);
    }
    if (this.props.onFocus) {
      this.props.onFocus();
    }
  };

  onChange = (value) => {
    if (!this.isTextInput(this.props.type)) {
      this.setState({ value });
    }
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  };

  onDateChange = (value) => {
    this.setState({ value });
    if (this.props.onChange) {
      this.props.onChange(value);
    }
    if (this.props.next) {
      this.context.focus(this.props.next);
    } else if (this.props.send) {
      this.context.submit(this.props.next);
    }
  };

  onContentSizeChange = (e) => {
    if (this.props.onContentSizeChange) {
      this.props.onContentSizeChange(e);
    }
  };

  onEndEditing = () => {
    if (this.props.onEndEditing) {
      this.props.onEndEditing();
    }
  };

  onLayout = (e) => {
    if (this.props.onLayout) {
      this.props.onLayout(e);
    }
  };

  onScroll = (e) => {
    if (this.props.onScroll) {
      this.props.onScroll(e);
    }
  };

  onSelectionChange = (e) => {
    if (this.props.onSelectionChange) {
      this.props.onSelectionChange(e);
    }
  };

  onSubmitEditing = () => {
    if (this.props.onSubmitEditing) {
      this.props.onSubmitEditing(this.props.name || null);
    } else if (this.props.next) {
      this.context.focus(this.props.next);
    } else if (this.props.send) {
      this.context.submit(this.props.next);
    }
  };

  onKeyPress = (e) => {
    if (this.props.onKeyPress) {
      this.props.onKeyPress(e);
    }
  };

  getDate(date = this.props.date) {
    const { mode, minDate, maxDate, format = FORMATS[mode] } = this.props;

    // date默认值
    if (!date) {
      const now = new Date();
      if (minDate) {
        const _minDate = this.getDate(minDate);

        if (now < _minDate) {
          return _minDate;
        }
      }

      if (maxDate) {
        const _maxDate = this.getDate(maxDate);

        if (now > _maxDate) {
          return _maxDate;
        }
      }

      return now;
    }

    if (date instanceof Date) {
      return date;
    }

    return moment(date, format).toDate();
  }

  getDateStr(date = this.props.date) {
    const { mode, format = FORMATS[mode] } = this.props;

    const dateInstance = date instanceof Date ? date : this.getDate(date);

    if (typeof this.props.getDateStr === 'function') {
      return this.props.getDateStr(dateInstance);
    }

    return moment(dateInstance).format(format);
  }


  setValue = (value) => {
    if (value !== this.state.value) {
      this.setState({ value });
      this.onChange(value);
    }
  };

  getValue = () => this.state.value;

  focus = () => {
    if (this.isTextInput(this.props.type)) {
      this.TextInput.focus();
    } else if (this.isDatetimeInput(this.props.type)) {
      // Se pusó este timeout para poner el focus hasta que termine la animación del anterior
      setTimeout(() => {
        this.DakePicker.onPressDate();
      }, 400);
    } else if (this.isSelectInput(this.props.type)) {
      console.log('baseInput focus');
      setTimeout(() => {
        this.Select.focus();
      }, 400);
    }
  };

  blur = () => {
    if (this.TextInput) {
      this.TextInput.blur();
    }
  };

  isFocused = () => this.TextInput.isFocused();

  clear = () => {
    if (this.TextInput) {
      this.TextInput.clear();
    }
    this.setState({ value: null });
  };

  invalidate = (error) => {
    this.setState({ error });
  };

  validate = () => {
    this.setState({ error: null });
  };

  _register = (ref) => {
    const { registerInput } = this.context;
    if (registerInput !== undefined) {
      registerInput(this.props.name, {
        ref,
        focus: this.focus.bind(this),
        blur: this.blur.bind(this),
        getValue: this.getValue.bind(this),
        setValue: this.setValue.bind(this),
        validate: this.validate.bind(this),
        invalidate: this.invalidate.bind(this),
      });
    }
  };

  beforeRenderControl = props => {
    return Object.assign({}, props);
  };

  isTextInput(inputType) {
    const type = inputType ? inputType : this.props.type;
    const textInputs = ['text', 'email', 'numeric', 'password', 'phone'];
    return textInputs.indexOf(type) >= 0;
  }

  isDatetimeInput(inputType) {
    const type = inputType ? inputType : this.props.type;
    const textInputs = ['date', 'datetime', 'time'];
    return textInputs.indexOf(type) >= 0;
  }

  isSelectInput(inputType) {
    const type = inputType ? inputType : this.props.type;
    return type === 'select';
  }

  renderTextInput(props) {
    let TextInputStyle = [props.inputStyle];
    if (this.state.error) {
      TextInputStyle.push(props.errorStyle);
    }
    const { mask } = this.props;
    // console.log(this.props);
    // const InputControl = this.props.mask ? TextInputMask : TextInput;
    return (
      <TextInput
        ref={ref => { this.TextInput = ref; }}
        {...props}
        accessibilityLabel={props.label}
        style={TextInputStyle}
        onChangeText={this.onChangeText}
        onBlur={this.onBlur}
        onChange={this.onChange}
        onContentSizeChange={this.onContentSizeChange}
        onEndEditing={this.onEndEditing}
        onFocus={this.onFocus}
        onLayout={this.onLayout}
        onSelectionChange={this.onSelectionChange}
        onSubmitEditing={this.onSubmitEditing}
        onKeyPress={this.onKeyPress}
        value={this.state.value}
      />
    );
  }

  renderRadioOption(option, value) {
    return (
      <TouchableOpacity
        style={styles.radioOption}
        onPress={() => { this.setValue(value); }}
        key={value}
      >
        <View style={styles.radioOptionButton}>
          {value === this.state.value &&
          <View style={styles.radioOptionButtonMark} />}
        </View>
        <Text style={styles.radioOptionText}>{option}</Text>
      </TouchableOpacity>
    );
  }

  renderRadioOptions() {
    const { options } = this.props;
    return Object.keys(options).foreach(
      option => this.renderRadioOption(option, options[option]));
  }

  renderSwitch() {

  }

  renderDatePicker(props) {
    let style = [props.datePickerStyle];
    return (
      <DatePicker
        ref={ref => { this.DakePicker = ref; }}
        style={style}
        customStyles={{
          dateInput: {
            borderWidth: 0,
          },
        }}
        {...props}
        mode={this.props.type}
        onDateChange={this.onDateChange}
        date={this.state.value}
      />
    );
  }

  renderSelect(props) {
    return (
      <SelectInput
        ref={ref => { this.Select = ref; }}
        {...props}
        value={this.state.value}
        onConfirm={this.onChange}
      />
    );
  }


  renderControl() {
    const props = this.beforeRenderControl(this.props);
    if (this.isTextInput(this.props.type)) { // Si se necesita un TextInput
      if(this.props.type !== 'password'){
        props.keyboardType = mapTypeToKeyboardType[this.props.type];
      }else if(props.secureTextEntry === undefined){
        props.secureTextEntry = true;
      }

      props.returnKeyType = props.next ? 'next' : props.returnKeyType;
      props.returnKeyType = props.send ? 'send' : props.returnKeyType;
      props.value = this.props.value ? this.props.value : this.state.value;
      return this.renderTextInput(props);
    }
    if (this.props.type === 'radio') {
      return this.renderRadioOptions();
    }

    if (this.props.type === 'switch') {
      return this.renderSwitch();
    }

    if (['date', 'time', 'datetime'].indexOf(this.props.type) >= 0) {
      props.customStyles = props.dateCustomStyles;
      delete props.dateCustomStyles;
      return this.renderDatePicker(props);
    }

    if (this.props.type === 'select') {
      return this.renderSelect(props);
    }

    // TODO: Poner los demas tipos de controles (switch, options, datePicker) para cada plataforma
    return null;
  }

  render() {
    return (
      <View ref={this._register} style={{ flex: 1 }}>
        {this.renderControl()}
      </View>
    );
  }

}

export default BaseInput;
