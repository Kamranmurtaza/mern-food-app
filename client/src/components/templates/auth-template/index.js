import PropTypes from 'prop-types';
import Logo from 'components/atoms/logo';
import './styles.scss';

const AuthTemplate = ({ className = '', center, ...props }) => {
  return (
    <div className={`auth-template ${className}`} {...props}>
      <div className="auth-template__logo-wrapper">
        <Logo style={{ color: 'white' }} />
      </div>
      <div className="auth-template__content">{center}</div>
    </div>
  );
};

AuthTemplate.propTypes = {
  className: PropTypes.string,
  center: PropTypes.node,
};

export default AuthTemplate;
