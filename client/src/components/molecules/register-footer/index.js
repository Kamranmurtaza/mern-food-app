import { Link } from 'react-router-dom';

const RegisterFooter = () => {
  return (
    <div>
      Already registered? <Link to="/login">Login</Link>
    </div>
  );
};

export default RegisterFooter;
