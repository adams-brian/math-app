import React from 'react';
import { Link, Switch, Route, useRouteMatch } from "react-router-dom";
import './index.css';
import Report from './report';

const Home = () => {
  let { path, url } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${path}/home`}>
        <div className="modes">
          <Link className="mode link-button" to={`${url}/addition`}>Addition</Link>
          <Link className="mode link-button" to={`${url}/subtraction`}>Subtraction</Link>
          <Link className="mode link-button" to={`${url}/multiplication`}>Multiplication</Link>
          <Link className="mode link-button" to={`${url}/division`}>Division</Link>
        </div>
      </Route>
      <Route path={`${path}/:mode`}>
        <Report />
      </Route>
    </Switch>
  );
}

export default Home;
