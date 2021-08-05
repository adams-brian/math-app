import React from 'react';
import Nav from './nav';
import Report from './report';
import { Route, Redirect, Switch, useRouteMatch } from 'react-router-dom';

const Home = () => {
  const { path } = useRouteMatch();

  return (
    <div className="report-main">
      <Switch>
        <Route path={`${path}/:mode`}>
          <Nav />
          <Report />
        </Route>
        <Redirect to={`${path}/addition`} />
      </Switch>
    </div>
  );
}

export default Home;
