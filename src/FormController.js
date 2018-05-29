import { shape, func } from 'prop-types';

const FormController = shape({
  submit: func,
  clear: func,
  reset: func,
  setData: func,
  validate: func,
  getData: func,
});

export default FormController;
