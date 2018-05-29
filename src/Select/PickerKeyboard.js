import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SelectModal from './SelectModal';
import {
  Picker,
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  pickerView: {
    width: SCREEN_WIDTH,
    backgroundColor: 'white',
  },
});

class PickerKeyboard extends Component {
  static propTypes = {
    confirmBtnText: PropTypes.string,
    cancelBtnText: PropTypes.string,
    buttonsContainerStyles: PropTypes.object,
    confirmBtnStyles: PropTypes.object,
    cancelBtnStyles: PropTypes.object,
    confirmBtnTextStyles: PropTypes.object,
    cancelBtnTextStyles: PropTypes.object,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
    options: PropTypes.array,
    style: PropTypes.object,
    value: PropTypes.any,
  };

  constructor(props) {
    super(props);

    // initial state
    this.state = {
      value: props.value,
      visible: false,
    };
    this.focus = this.focus.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const currentValue = this.state.value;

    if (nextProps.value !== currentValue) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  onCancelPress = () => {
    return this.props.onCancel();
  };

  onConfirmPress = () => {
    return this.props.onConfirm(this.state.value);
  };

  onValueChange = (value) => {
    this.setState({ value });
  };

  focus() {
    console.log('baseInput focus');
    this.Modal.show();
  };

  render() {
    const props = this.props;
    return (
      <SelectModal
        ref={ref => { this.Modal = ref; }}
        cancelBtnStyles={props.cancelBtnStyles}
        confirmBtnStyles={props.cancelBtnStyles}
        confirmBtnTextStyles={props.confirmBtnTextStyles}
        cancelBtnTextStyles={props.cancelBtnTextStyles}
        cancelBtnText={props.cancelBtnText}
        confirmBtnText={props.confirmBtnText}
        onCancelPress={this.onCancelPress}
        onConfirmPress={this.onConfirmPress}
      >
        <Picker
          ref={(c) => { this.picker = c; }}
          selectedValue={this.state.value}
          onValueChange={this.onValueChange}
          style={[styles.pickerView, props.style]}
        >
          {props.options.map((option, key) => {
            return <Picker.Item key={key} {...option} />;
          })}
        </Picker>
      </SelectModal>
    );
  }
}

export default PickerKeyboard;
