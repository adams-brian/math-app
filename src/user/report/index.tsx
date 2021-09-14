import React from 'react';
import Report from './report';
import { Route, Redirect, Switch, useRouteMatch } from 'react-router-dom';

const Home = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/:mode`}>
        <Report />
      </Route>
      <Redirect to={`${path}/addition`} />
    </Switch>
  );
}

export default Home;
