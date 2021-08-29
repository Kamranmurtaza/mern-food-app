import PropTypes from 'prop-types';
import './styles.scss';

const Card = ({ children, className, ...props }) => {
  return (
    <div className={`card ${className}`} {...props}>
      {children}
    </div>
  );
};

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Card;
