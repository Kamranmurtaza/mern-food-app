import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Button from 'components/atoms/button';
import Logo from 'components/atoms/logo';
import { logout } from 'redux/users/actions';
import './styles.scss';
import { BUYER, RESTAURANT_OWNER } from 'utils/roles';

const Navbar = () => {
  const dispatch = useDispatch();
  const { data: user } = useSelector((state) => state.user);
  const history = useHistory();

  const onLogout = () => {
    dispatch(logout(history));
  };

  return (
    <div className="navbar">
      <Logo />
      <div className="navbar__links">
        {user?.userType === RESTAURANT_OWNER && <Link to="/dashboard/restaurants">Dashboard</Link>}
        {user?.id && <Link to={user?.userType === RESTAURANT_OWNER ? '/dashboard/orders' : '/orders'}>Orders</Link>}
        {user?.userType === BUYER && <Button to="/dashboard/restaurants">Cart(0)</Button>}

        {!user?.id && (
          <div>
            <Link to="/login">
              <Button>Login</Button>
            </Link>
            <Link to="/register">
              <Button>Register</Button>
            </Link>
          </div>
        )}
        {user?.id && (
          <div>
            <Button onClick={onLogout}>Logout</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
