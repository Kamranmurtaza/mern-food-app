import spinner from 'assets/images/spinner.gif';
import './styles.scss';

const PageLoader = ({ className }) => {
  return (
    <div className={`page-loader ${className}`}>
      <img src={spinner} alt="loader" />
    </div>
  );
};

export default PageLoader;
