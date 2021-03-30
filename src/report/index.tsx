import React from 'react';
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import './index.css';
import Report from './report';

const Home = () => {
  const { path, url } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${path}/home`}>
        <div className="modes">
          <Link className="mode link-button" to={`${url}/addition/home`}>Addition</Link>
          <Link className="mode link-button" to={`${url}/subtraction/home`}>Subtraction</Link>
          <Link className="mode link-button" to={`${url}/multiplication/home`}>Multiplication</Link>
          <Link className="mode link-button" to={`${url}/division/home`}>Division</Link>
        </div>
      </Route>
      <Route path={`${path}/:mode`}>
        <Report />
      </Route>
    </Switch>
  );
}

export default Home;
