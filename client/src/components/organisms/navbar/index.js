import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { logout } from 'redux/users/actions';
import Button from 'components/atoms/button';
import Logo from 'components/atoms/logo';
import Sidebar from 'components/atoms/sidebar';
import CartItem from 'components/molecules/cart-item';
import { BUYER, RESTAURANT_OWNER } from 'utils/roles';
import { editCart, fetchCart } from 'redux/cart/actions';
import PageLoader from 'components/atoms/page-loader';
import { placeOrder } from 'redux/orders/actions';
import './styles.scss';

const Navbar = () => {
  const dispatch = useDispatch();
  const { data: user } = useSelector((state) => state.user);
  const { data: cart, isLoading } = useSelector((state) => state.cart);
  const history = useHistory();
  const [sideCart, setSideCart] = useState(false);

  useEffect(() => {
    if (user?.id && user?.cartId) {
      dispatch(fetchCart(user.cartId));
    }
  }, [user, dispatch]);

  const onLogout = () => {
    dispatch(logout(history));
  };

  const onDelete = (mealId) => {
    const items = cart.items.filter((item) => item.meal._id !== mealId);
    dispatch(editCart({ items, cartId: cart.cartId, restaurantId: cart.restaurantId }));
  };

  const sideCartOpen = () => {
    setSideCart(true);
  };

  const sideCartClose = () => {
    setSideCart(false);
  };

  const placeOrders = () => {
    dispatch(placeOrder({ items: cart.items, restaurantId: cart.restaurantId }, history));
  };

  return (
    <>
      {isLoading && <PageLoader />}
      <div className="navbar">
        <Logo />
        <div className="navbar__links">
          {user?.userType === RESTAURANT_OWNER && <Link to="/dashboard/restaurants">Dashboard</Link>}
          {user?.userType === RESTAURANT_OWNER && <Link to="/dashboard/users">Users</Link>}
          {user?.id && <Link to={user?.userType === RESTAURANT_OWNER ? '/dashboard/orders' : '/orders'}>Orders</Link>}
          {user?.userType === BUYER && (
            <Button to="/dashboard/restaurants" onClick={sideCartOpen}>
              Cart({cart?.items?.length || 0})
            </Button>
          )}

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
      <Sidebar
        open={sideCart}
        onClose={sideCartClose}
        title="Cart"
        footer={() => {
          if (cart?.items?.length > 0) {
            let total = cart.items.reduce((prev, cur) => {
              return cur.meal.price * cur.quantity + prev;
            }, 0);
            return (
              <>
                <div className="cart-total">
                  <div>Total:</div>
                  <div>${total}</div>
                </div>
                <Button
                  style={{
                    marginTop: '10px',
                    width: '100%',
                  }}
                  onClick={placeOrders}
                >
                  Place Order
                </Button>
              </>
            );
          }
        }}
      >
        {cart?.items &&
          cart?.items.length > 0 &&
          cart.items.map(({ meal, quantity }) => (
            <CartItem
              id={meal._id}
              key={meal._id}
              name={meal.name}
              quantity={quantity}
              amount={meal.price * quantity}
              onDelete={onDelete}
            />
          ))}
      </Sidebar>
    </>
  );
};

export default Navbar;
