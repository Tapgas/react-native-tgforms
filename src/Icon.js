import React from 'react';
import PropTypes from 'prop-types';
import getIcon from './utils/getIcon';

const Icon = props => {
  const Component = getIcon(props.type);
  return <Component {...props} />;
};

Icon.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
  style: PropTypes.any,
};

Icon.defaultProps = {
  type: 'SimpleLineIcons',
};

export default Icon;
