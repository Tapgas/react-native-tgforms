/**
 * SelectInput
 * https://github.com/markuswind/react-native-select-input
 */

import AbstractSelectInput from './AbstractSelectInput.js';

import PropTypes from 'prop-types';
import React from 'react';
import { Picker, View, ViewPropTypes, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  defaultContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
  },
  defaultLabelStyle: {
    flex: 1,
  },
});

class SelectInput extends AbstractSelectInput {
  constructor(props) {
    super(props);

    // refs
    this.picker = null;

    // initial state
    this.state = {
      selectedValue: props.value,
    };
  }

  render() {
    const props = this.props;
    const state = this.state;
    const options = props.options.slice(0);
    if (props.empty) {
      options.unshift({ value: '', label: props.empty });
    }

    return (
      <View style={[styles.defaultContainerStyle, props.style]}>
        <Picker
          ref={(c) => { this.picker = c; }}
          mode={props.mode}
          prompt={props.prompt}
          selectedValue={state.selectedValue}
          onValueChange={this.onConfirm}
          style={[styles.defaultLabelStyle, props.selectCustomStyles.valueAndroid]}
        >
          {options.map((option) => {
            return (
              <Picker.Item
                key={option.value}
                value={option.value}
                label={option.label}
              />
            );
          })}
        </Picker>
      </View>
    );
  }
}

SelectInput.propTypes = {
  labelStyle: PropTypes.PropTypes.object,
  mode: PropTypes.oneOf(['dialog', 'dropdown']),
  options: PropTypes.array,
  style: PropTypes.oneOfType([ViewPropTypes.style, PropTypes.arrayOf(ViewPropTypes.style)]),
  value: PropTypes.any,
  prompt: PropTypes.string,
};

SelectInput.defaultProps = {
  mode: 'dropdown',
  options: [{ value: 0, label: '0' }],
  value: 0,
};

export default SelectInput;
