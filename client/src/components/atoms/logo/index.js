import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Heading from 'components/atoms/heading';
import './styles.scss';

const Logo = ({ white, ...props }) => {
  return (
    <Link
      style={{
        color: white ? 'white' : 'black',
      }}
      className="logo-link"
      to="/"
      {...props}
    >
      <Heading style={{ margin: 0 }}>LOGO.</Heading>
    </Link>
  );
};

Logo.propTypes = {
  white: PropTypes.bool,
};

export default Logo;
