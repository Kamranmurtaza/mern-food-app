import PropTypes from 'prop-types';
import './styles.scss';

const Input = ({ className = '', ...props }) => {
  return <input className={`input ${className}`} {...props} />;
};

Input.propTypes = {
  className: PropTypes.string,
};

export default Input;
