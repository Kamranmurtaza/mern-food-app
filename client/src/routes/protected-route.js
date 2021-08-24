import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ auth, role, ...props }) => {
  const { data: user } = useSelector((state) => state.user);

  if (!!auth === !!user?.id || (user?.id && role && role !== user?.userType)) {
    return <Redirect to="/" />;
  }

  return <Route {...props} />;
};

export default ProtectedRoute;
