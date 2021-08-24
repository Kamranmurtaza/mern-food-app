import PropTypes from 'prop-types';
import './styles.scss';

const TextArea = ({ className = '', ...props }) => {
  return <textarea className={`textarea ${className}`} {...props} />;
};

TextArea.propTypes = {
  className: PropTypes.string,
};

export default TextArea;
