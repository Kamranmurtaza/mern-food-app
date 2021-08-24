import PropTypes from 'prop-types';
import './styles.scss';

const Label = ({ className = '', children, ...props }) => {
  return (
    <label className={`label ${className}`} {...props}>
      {children}
    </label>
  );
};

Label.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Label;
