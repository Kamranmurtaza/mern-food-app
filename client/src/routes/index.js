import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from 'pages/login';
import RegisterPage from 'pages/register';
import Home from 'pages/home';
import { BUYER, RESTAURANT_OWNER } from 'utils/roles';
import ProtectedRoute from './protected-route';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <ProtectedRoute exact path="/login" auth component={LoginPage} />
        <ProtectedRoute exact path="/register" auth component={RegisterPage} />
        <ProtectedRoute exact path="/buyer" role={BUYER}>
          <div>buyer - protected</div>
        </ProtectedRoute>
        <ProtectedRoute exact path="/restaurant-owner" role={RESTAURANT_OWNER}>
          <div>restaurant owner - protected</div>
        </ProtectedRoute>
      </Switch>
    </Router>
  );
};

export default Routes;
