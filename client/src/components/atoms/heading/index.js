import PropTypes from 'prop-types';
import './styles.scss';

const Heading = ({ className = '', type = 'h2', children, ...props }) => {
  const CustomHeading = `${type}`;

  return (
    <CustomHeading className={`heading ${className}`} {...props}>
      {children}
    </CustomHeading>
  );
};

Heading.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  children: PropTypes.node,
};

export default Heading;
