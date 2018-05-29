import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Platform,
} from 'react-native';
import BaseInput from './BaseInput';
import Icon from './Icon';

const colors = {
  darkGray: '#555',
  gray: '#E1E1E1',
  green: '#4DC9B2',
  red: '#FF5370',
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#d2d8df',
    borderRadius: 4,
    backgroundColor: 'white',
    paddingLeft: 8,
    paddingRight: 8,
    height: 40,
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  errorStyle: {
    color: 'red',
    fontSize: 12,
    marginVertical: 4,
  },
  inputStyle: {
    height: 40,
    color: colors.darkGray,
    fontSize: 14,
  },
});

const dateCustomStyles = {
  dateInput: {
    flex: 1,
    alignItems: 'flex-start',
    borderWidth: 0,
  },
  placeholderText: {
    textAlign: 'left',
  },
  dateText: {
    textAlign: 'left',
    color: colors.darkGray,
  },
  btnTextConfirm: {
    color: colors.green,
  },
};

const selectCustomStyles = {
  value: {
    color: colors.darkGray,
  },
  valueAndroid: {
    color: colors.darkGray,
  },
  confirmBtnText: {
    color: colors.green,
    fontSize: 16,
  },
  cancelBtnText: {
    color: colors.darkGray,
    fontSize: 16,
  },
};

class Input extends BaseInput {
  static propTypes = {
    ...BaseInput.propTypes,
    label: PropTypes.string,
    error: PropTypes.string,
    inputStyle: PropTypes.any,
  };

  static defaultProps = {
    ...BaseInput.defaultProps,
    inputStyle: styles.inputStyle,
    datePicker: styles.datePickerStyle,
    underlineColorAndroid: 'transparent',
    enablesReturnKeyAutomatically: true,
    tintColor: colors.gray,
    clearButtonMode: 'while-editing',
    placeholderTextColor: '#9A9A9A',
    confirmBtnText: 'Ok',
    cancelBtnText: 'Cancel',
    dateCustomStyles,
    selectCustomStyles,
  };

  render() {
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <TouchableWithoutFeedback
          onPress={() => { this.focus(); }}
          style={{ padding: 8 }}
        >
          <View>
            {this.props.label &&
            (<Text style={styles.label}>{this.props.label}</Text>)}
            <View
              style={[styles.inputContainer, this.props.inputContainerStyles]}>
              {super.render()}
              {(this.props.type === 'select' && Platform.OS === 'ios') && (
                <Icon
                  type="MaterialIcons"
                  name="arrow-drop-down"
                  size={24}
                  color={colors.gray}
                />
              )}
              {this.props.type === 'date' && (
                <Icon
                  name="calendar"
                  size={24}
                  color={colors.gray}
                />
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
        {this.state.error && (
          <Text style={styles.errorStyle}>{this.state.error}</Text>
        )}
      </View>
    );
  }
}

export default Input;
