import PropTypes from 'prop-types';
import Navbar from 'components/organisms/navbar';

const PageTemplate = ({ children, className = '', ...props }) => {
  return (
    <div className={`page-template ${className}`} {...props}>
      <Navbar />
      <div>{children}</div>
    </div>
  );
};

PageTemplate.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default PageTemplate;
