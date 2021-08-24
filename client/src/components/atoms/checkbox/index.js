import PropTypes from 'prop-types';
import './styles.scss';

const Checkbox = ({ className = '', ...props }) => {
  return <input type="checkbox" className={`checkbox ${className}`} {...props} />;
};

Checkbox.propTypes = {
  className: PropTypes.string,
};

export default Checkbox;
