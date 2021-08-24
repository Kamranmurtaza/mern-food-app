import { Link } from 'react-router-dom';

const LoginFooter = () => {
  return (
    <div>
      Not registered? <Link to="/register">Register</Link>
    </div>
  );
};

export default LoginFooter;
