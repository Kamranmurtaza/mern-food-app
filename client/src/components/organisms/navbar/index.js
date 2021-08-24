import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Button from 'components/atoms/button';
import Logo from 'components/atoms/logo';
import { logout } from 'redux/users/actions';
import './styles.scss';

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
  );
};

export default Navbar;
