import BaseInput from './BaseInput';
/* import FormContext from './FormContext';
import Form from './Form';
import Input from './Input';
import Submit from './Submit';
import FormScrollView from './FormScrollView';
import BaseInput from './BaseInput';

export default {
  FormContext,
  Form,
  FormScrollView,
  BaseInput,
  Submit,
  Input,
};
*/

module.exports = {
  get FormContext() {
    return require('./FormContext').default;
  },
  get Form() {
    return require('./Form').default;
  },
  get BaseInput() {
    return require('./BaseInput').default;
  },
  get Input() {
    return require('./Input').default;
  },
  get Submit() {
    return require('./Submit').default;
  },
  get FormScrollView() {
    return require('./FormScrollView').default;
  },
};
