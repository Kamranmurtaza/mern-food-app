import './styles.scss';

const Banner = ({ children, className, ...props }) => {
  return (
    <div className={`banner ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Banner;
