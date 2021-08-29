import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import LoginPage from 'pages/login';
import RegisterPage from 'pages/register';
import { BUYER, RESTAURANT_OWNER } from 'utils/roles';
import ProtectedRoute from './protected-route';
import RestaurantsPage from 'pages/restaurants';
import MealsPage from 'pages/meals';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="restaurants" />
        </Route>
        <Route exact path="/restaurants" component={RestaurantsPage} />
        <Route exact path="/restaurants/:restaurantId/meals" component={MealsPage} />
        <ProtectedRoute exact path="/login" auth component={LoginPage} />
        <ProtectedRoute exact path="/register" auth component={RegisterPage} />
        <ProtectedRoute exact path="/buyer" role={BUYER}>
          <div>buyer - protected</div>
        </ProtectedRoute>
        <ProtectedRoute exact path="/dashboard/restaurants" role={RESTAURANT_OWNER}>
          <RestaurantsPage showActions={true} />
        </ProtectedRoute>
        <ProtectedRoute exact path="/dashboard/restaurants/:restaurantId/meals" role={RESTAURANT_OWNER}>
          <MealsPage showActions={true} />
        </ProtectedRoute>
      </Switch>
    </Router>
  );
};

export default Routes;
