import PropTypes from 'prop-types';
import Navbar from 'components/organisms/navbar';
import PageLoader from 'components/atoms/page-loader';

const PageTemplate = ({ children, className = '', isLoading, ...props }) => {
  return (
    <div className={`page-template ${className}`} {...props}>
      {isLoading && <PageLoader />}
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
