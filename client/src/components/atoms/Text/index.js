import PropTypes from 'prop-types';

const Text = ({ children, ...props }) => {
  return <p {...props}>{children}</p>;
};

Text.propTypes = {
  children: PropTypes.node,
};

export default Text;
