import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { DashboardRoutes } from './DashboardRoutes';
import { PrivateRoute } from './PrivateRoute';
import { useSelector } from 'react-redux';
import { PublicRoute } from './PublicRoute';
import { AuthRouter } from './AuthRouter';
const AppRouter = React.memo(() => {
  const { isLogged } = useSelector((state) => state.login);

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
});

export default AppRouter;
