import React, { createContext } from 'react';
import './index.css';
import Nav from './nav';
import Report from './report';
import { Route, Redirect, Switch, useRouteMatch } from 'react-router-dom';

export const ReportBaseUrl = createContext('');

const Home = () => {
  const { path, url } = useRouteMatch();

  return (
    <div className="report-main">
      <ReportBaseUrl.Provider value={url}>
        <Switch>
          <Route path={`${path}/:mode`}>
            <Nav />
            <Report />
          </Route>
          <Redirect to={`${path}/addition`} />
        </Switch>
      </ReportBaseUrl.Provider>
    </div>
  );
}

export default Home;
