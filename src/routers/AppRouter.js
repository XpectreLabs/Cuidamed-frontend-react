import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { DashboardRoutes } from './DashboardRoutes';
import { PrivateRoute } from './PrivateRoute';
import { useDispatch } from 'react-redux';
import { PublicRoute } from './PublicRoute';
import { AuthRouter } from './AuthRouter';
const AppRouter = () => {
  const dispatch = useDispatch();
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && token !== '') setIsLogged(true);
  }, [dispatch]);
  return (
    <Router>
      <div>
        <Switch>
          <PrivateRoute
            isAuthenticated={isLogged}
            component={DashboardRoutes}
            path="/dashboard"
          />
          <PublicRoute
            isAuthenticated={isLogged}
            component={AuthRouter}
            path="/"
          />
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;
