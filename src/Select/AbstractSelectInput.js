import PropTypes from 'prop-types';
import { Component } from 'react';

class AbstractSelectInput extends Component {

  static propTypes = {
    value: PropTypes.string,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
    onChange: PropTypes.func,
    selectCustomStyles: PropTypes.object,
    placeholder: PropTypes.string,
    options: PropTypes.array,
    empty: PropTypes.string,
  };

  static componentWillReceiveProps(nextProps) {
    const currentValue = this.props.value;

    if (nextProps.value !== currentValue) {
      this.setState({
        selectedValue: nextProps.value,
      });
    }
  }

  onCancel = () => {
    this.props.onCancel();
  };

  onConfirm = (value) => {
    this.setState({ selectedValue: value }, () => {
      this.props.onConfirm(value);
    });
  };

  getValueLabel() {
    const { selectedValue } = this.state;
    const options = this.props.options || [{ value: '', label: '' }];

    const selected = options.find(({ value }) => value === selectedValue);
    if (!selected) {
      if (this.props.empty) {
        return this.props.empty;
      }
      return options[0].label;
    }
    return selected.label;
  }

  getStylesProps = () => {
    const styles = {};
    const { selectCustomStyles } = this.props;
    Object.keys(selectCustomStyles).forEach(key => {
      if (key === 'pickerKeyboard') {
        styles.style = selectCustomStyles[key];
      }
      styles[`${key}Styles`] = selectCustomStyles[key]
        ? selectCustomStyles[key]
        : undefined;
    });
    return styles;
  };

}

export default AbstractSelectInput;
