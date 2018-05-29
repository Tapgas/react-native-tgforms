import PropTypes from 'prop-types';
import React from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  View,
  ViewPropTypes,
  StyleSheet,
} from 'react-native';
import AbstractSelectInput from './AbstractSelectInput.js';
import PickerKeyboard from './PickerKeyboard';

const styles = StyleSheet.create({
  defaultContainerStyle: {
    justifyContent: 'center',
    flexDirection: 'column',
    height: 40,
  },
  defaultLabelStyle: {
    alignSelf: 'center',
    fontSize: 13,
  },
  textStyles: {
    flex: 1,
  },
});

class SelectInput extends AbstractSelectInput {
  constructor(props) {
    super(props);

    // refs
    this.pickerKeyboard = null;

    // initial state
    this.state = {
      selectedValue: props.value,
    };
    // this.focus = this.focus.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.selectedValue) {
      this.setState({ selectedValue: nextProps.value });
    }
  }

  getValue() {
    return this.state.selectedValue;
  }

  focus() {
    console.log('selectInput focus');
    this.pickerKeyboard.focus();
    if (this.props.onBeginEditing) this.props.onBeginEditing();
  };

  render() {
    const props = this.props;
    const options = props.options.slice(0);
    if (props.empty) {
      options.unshift({ value: '', label: props.empty });
    }

    return (
      <TouchableWithoutFeedback onPress={() => {
        console.log('4');
        this.focus();
      }}>
        <View style={[styles.defaultContainerStyle, props.style]}>
          <Text
            style={[styles.textStyle, props.selectCustomStyles.value]}
            adjustFontSizeToFit
            allowFontScaling={false}
            numberOfLines={1}
          >
            {this.getValueLabel()}
          </Text>

          <PickerKeyboard
            ref={ref => { this.pickerKeyboard = ref; }}
            options={options}
            value={this.state.selectedValue}
            onCancel={this.onCancel}
            onConfirm={this.onConfirm}
            confirmBtnText={props.confirmBtnText}
            cancelBtnText={props.cancelBtnText}
            {...this.getStylesProps()}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

SelectInput.propTypes = {
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  onChange: PropTypes.func,
  customStyles: PropTypes.object,
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  style: PropTypes.oneOfType([
    ViewPropTypes.style,
    PropTypes.arrayOf(ViewPropTypes.style),
  ]),
  textStyle: PropTypes.object,
  value: PropTypes.any,
  empty: PropTypes.string,
};

SelectInput.defaultProps = {
  options: null,
  confirmBtnText: 'Accept',
  cancelBtnText: 'Cancel',
  onCancel: () => {},
  onConfirm: () => {},
  onChange: () => {},
};

export default SelectInput;
