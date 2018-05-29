import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Modal,
  TouchableWithoutFeedback,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  Easing,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#0005',
  },
  modal: {
    width: SCREEN_WIDTH,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    opacity: 0,
    transform: [
      { translateY: SCREEN_HEIGHT / 2 },
    ],
  },
  buttons: {
    width: SCREEN_WIDTH,
    padding: 0,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'lightgrey',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    paddingHorizontal: 8,
    backgroundColor: '#f8f8f8',
  },
  picker_bottom: {
    width: SCREEN_WIDTH,
  },
  button: {
    paddingHorizontal: 8,
    height: 40,
    justifyContent: 'center',
  },
  cancelBtnText: {
    fontSize: 14,
    color: 'red',
  },
  confirmBtnText: {
    fontSize: 14,
    color: 'blue',
  },
});

class SelectModal extends Component {

  static propTypes = {
    // visible: PropTypes.bool.isRequired,
    confirmBtnText: PropTypes.string,
    cancelBtnText: PropTypes.string,
    buttonsContainerStyles: PropTypes.object,
    confirmBtnStyles: PropTypes.object,
    cancelBtnStyles: PropTypes.object,
    confirmBtnTextStyles: PropTypes.object,
    cancelBtnTextStyles: PropTypes.object,
    onCancelPress: PropTypes.func,
    onConfirmPress: PropTypes.func,
  };

  static defaultProps = {
    confirmBtnText: 'Accept',
    cancelBtnText: 'Cancel',
  };

  constructor(props) {
    super(props);
    this.animation = new Animated.Value(SCREEN_HEIGHT / 2);
    this.state = {
      visible: false,
    };
    //this.show = this.show.bind(this);
  }

  onCancel = () => {
    this.hide();
    setTimeout(() => {
      this.props.onCancelPress();
    }, 110);
  };

  onConfirm = () => {
    this.hide();
    setTimeout(() => {
      this.props.onConfirmPress();
    }, 110);
  };

  show() {
    console.log('show');
    this.setState({ visible: true });
    console.log(this.state);
    Animated.timing(this.animation, {
      toValue: 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  hide() {
    Animated.timing(this.animation, {
      toValue: SCREEN_HEIGHT / 2,
      duration: 100,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      this.setState({ visible: false });
    });
  }

  render() {
    const props = this.props;
    const transform = [
      { translateY: this.animation },
    ];
    const opacity = this.animation.interpolate({
      inputRange: [0, SCREEN_HEIGHT / 2],
      outputRange: [1, 0],
    });

    return (
      <Modal transparent visible={this.state.visible}>
        <TouchableWithoutFeedback onPress={this.onCancel}>
          <View style={styles.container}>
            <Animated.View style={[styles.modal, { transform, opacity }]}>
              <View style={[styles.buttons, props.buttonsContainerStyles]}>
                <TouchableOpacity
                  style={[styles.button, styles.cancelBtnStyles]}
                  onPress={this.onCancel}
                >
                  <Text
                    allowFontScaling={false}
                    style={[styles.cancelBtnText, props.cancelBtnTextStyles]}
                  >
                    {this.props.cancelBtnText}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.confirmBtnStyles]}
                  onPress={this.onConfirm}
                >
                  <Text
                    allowFontScaling={false}
                    style={[styles.confirmBtnText, props.confirmBtnTextStyles]}
                  >
                    {this.props.confirmBtnText}
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                {props.children}
              </View>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
}

export default SelectModal;
