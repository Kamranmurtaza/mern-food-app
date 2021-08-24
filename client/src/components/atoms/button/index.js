import PropTypes from 'prop-types';
import './styles.scss';

const Button = ({ className = '', children, ...props }) => {
  return (
    <button className={`button ${className}`} {...props}>
      {children}{' '}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Button;
