import React, {
  Component,
} from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  Keyboard,
  ScrollView,
  View,
  findNodeHandle,
  NativeModules,
  LayoutAnimation, Dimensions,
} from 'react-native';

const { height: screenHeight } = Dimensions.get('window');
const animations = {
  layout: {
    easeInEaseOut: {
      duration: 250,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.scaleXY,
      },
      update: {
        delay: 0,
        type: LayoutAnimation.Types.easeInEaseOut,
      },
    },
  },
};

const propTypes = {
  ...ScrollView.propTypes,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
  extraSpace: PropTypes.number,
  nodeHeight: PropTypes.number,
  tabFooter: PropTypes.number,
  onScroll: PropTypes.func,
};

const defaultProps = {
  scrollPadding: 0,
  nodeHeight: 64,
  tabFooter: 0,
  onScroll: () => {},
};

class FormScrollView extends Component {

  static contextTypes = {
    getInput: PropTypes.func,
    getLayoutMeasure: PropTypes.func,
  };

  static childContextTypes = {
    smartScroll: PropTypes.func,
  };

  state = {
    keyboardVisible: false,
    scrollViewHeight: 0,
    scrollPosition: 0,
    keyboardSpace: 0,
  };

  getChildContext() {
    return {
      smartScroll: this.inputFocused,
    };
  }

  componentDidMount() {
    this._listeners = [
      Keyboard.addListener(
        Platform.OS === 'IOS' ? 'keyboardWillShow' : 'keyboardDidShow',
        this._keyboardWillShow,
      ),
      Keyboard.addListener(
        Platform.OS === 'IOS' ? 'keyboardWillHide' : 'keyboardDidHide',
        this._keyboardWillHide,
      ),
    ];
  }

  componentWillUpdate(props, state) {
    /* if (state.keyboardVisible !== this.state.keyboardVisible) {
      LayoutAnimation.configureNext(animations.layout.easeInEaseOut);
    }*/
  }

  componentWillUnmount() {
    this._listeners.forEach((listener) => listener.remove());
  }

  _afterKeyboardShow = () => {};

  inputFocused = (name) => {
    this._afterKeyboardShow = () => {
      const { scrollPosition, scrollViewHeight } = this.state;
      if (Platform.OS === 'ios') {
        setTimeout(() => {
          // const scrollResponder = this.scrollView.getScrollResponder();
          // const reactNode = findNodeHandle(this.context.getInput(name).ref);
          const { ref } = this.context.getInput(name);
          // const { y: parentY } = this.context.getLayoutMeasure();
          const { scrollPadding } = this.props;
          ref.measureLayout(findNodeHandle(this.scrollView), (X, Y, W, H) => {
            const py = Y - scrollPosition;
            // console.log({ name, py, X, Y, W, H, scrollViewHeight, 'py+H': py + H });
            if (py + H > scrollViewHeight) {
              const nextScrollPosition = (Y + H) - scrollViewHeight + scrollPadding;
              // console.log('nextScrollPosition', nextScrollPosition);
              this.scrollView.scrollTo({ y: nextScrollPosition });
              this.setState({ scrollPosition: nextScrollPosition });
            } else if (py < 0) {
              const nextScrollPosition = Y - scrollPadding;
              // console.log('nextScrollPosition', nextScrollPosition);
              this.scrollView.scrollTo({ y: nextScrollPosition });
              this.setState({ scrollPosition: nextScrollPosition });
            }
          });
        }, 0);
      }
    };
  };

  _getLayout = () => {
    const layoutParent = this.context.getLayoutMeasure();
    const y = layoutParent.y + this._layout.y;
    return { y, height: this._layout.height };
  };

  _getScrollViewHeight = keyboardHeight => {
    const { y, height } = this._getLayout();
    // console.log('_layout', this._getLayout());
    const spaceBelow = screenHeight - y - height;
    // const scrollViewHeight = height - Math.max(keyboardHeight - spaceBelow, 0);
    /* console.log('_getScrollViewHeight', {
      y,
      height,
      screenHeight,
      spaceBelow,
      keyboardHeight,
      scrollViewHeight,
    }); */
    return height - Math.max(keyboardHeight - spaceBelow, 0);
  };

  _getKeyboardSpace = keyboardHeight => {
    const { y, height } = this._getLayout();
    const spaceBelow = screenHeight - y - height;
    return Math.max(keyboardHeight - spaceBelow, 0);
  };

  _keyboardWillShow = (frames) => {
    const keyboardHeight = frames.end ? frames.end.height : frames.endCoordinates.height;
    this.setState({
      keyboardVisible: true,
      keyboardSpace: this._getKeyboardSpace(keyboardHeight),
      scrollViewHeight: this._getScrollViewHeight(keyboardHeight),
    });
    this._afterKeyboardShow();
  };

  _keyboardWillHide = () => {
    this.setState({
      keyboardVisible: false,
    });
  };

  _updateScrollPosition = (e) => {
    this.setState({ scrollPosition: e.nativeEvent.contentOffset.y });
  };

  /*
  _layoutMeasures = (e) => {
    this._layout = e.nativeEvent.layout;
    console.log(this._layout);
    this._container.measure((fx, fy, width, height, px, py) => {
      console.log('measure', { fx, fy, width, height, px, py });
    });
    this._container.measureInWindow((x, y, width, height) => {
      console.log('measureInWindow', { x, y, width, height });
    });
  };
  */

  render() {
    const { keyboardVisible, keyboardSpace } = this.state;
    return (
      <View
        style={{ flex: 1 }}
        ref={component => { this._container = component; }}
        onLayout={e => {
          this._layout = e.nativeEvent.layout;
          // console.log('FormScrollView', this._layout);
        }}
      >
        <ScrollView
          style={{ flex: 1 }}
          ref={e => (this.scrollView = e)}
          automaticallyAdjustContentInsets={false}
          keyboardShouldPersistTaps="handled"
          // keyboardDismissMode={'interactive'}
          scrollEventThrottle={1}
          showVerticalScrollIndicator={false}
          onScroll={(e) => {
            this._updateScrollPosition(e);
            this.props.onScroll(e);
          }}
          {...this.props}
        >
          {this.props.children}
          {keyboardVisible && <View style={{ height: keyboardSpace }} />}
        </ScrollView>
      </View>
    );
  }
}

FormScrollView.propTypes = propTypes;
FormScrollView.defaultProps = defaultProps;

export default FormScrollView;
