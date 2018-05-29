import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  Text,
} from 'react-native';

class Submit extends Component {

  static propTypes = {
    onPress: PropTypes.func,
    children: PropTypes.any,
    validate: PropTypes.bool,
    TouchableWithoutFeedback: PropTypes.bool,
    TouchableHighlight: PropTypes.bool,
    TouchableNativeFeedback: PropTypes.bool,
    style: PropTypes.any,
  };

  static contextTypes = {
    submit: PropTypes.func,
  };

  onPress = () => {
    this.context.submit(this.props.validate);
  };

  render() {
    let Touchable = TouchableOpacity;
    if (this.props.TouchableWithoutFeedback) {
      Touchable = TouchableWithoutFeedback;
    }
    return (
      <Touchable onPress={this.onPress} style={this.props.style}>
        {this.props.children}
      </Touchable>
    );
  }
}

export default Submit;
