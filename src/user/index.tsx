import React, { useContext } from 'react';
import { Link, Switch, Route, useParams, Redirect, useRouteMatch } from "react-router-dom";
import { DataStoreContext } from '../dataStore';
import Game from '../game';
import Report from '../report';
import './index.css';

const User = () => {
  const { userId } = useParams<{ userId: string }>();
  let { path, url } = useRouteMatch();
  const { getUserName } = useContext(DataStoreContext);
  const userName = getUserName(userId);

  return (
    <div className="user-main">
      <div className="welcome">Welcome {userName}!</div>
      <Switch>
        <Route path={`${path}/game/:mode`}>
          <Game />
        </Route>
        <Route path={`${path}/report`}>
          <Report />
        </Route>
        <Route path={`${path}/home`}>
          <div className="modes">
            <Link className="mode link-button" to={`${url}/game/addition`}>Addition</Link>
            <Link className="mode link-button" to={`${url}/game/subtraction`}>Subtraction</Link>
            <Link className="mode link-button" to={`${url}/game/multiplication`}>Multiplication</Link>
            <Link className="mode link-button" to={`${url}/game/division`}>Division</Link>
          </div>
          <Link className="mode link-button" to={`${url}/report/home`}>Report</Link>
          { userName === "Snappy_Snappy" ? <div className="easter-egg"> CodingStuffs_Yea=Snappy_Snappy idk;what:im.doing</div> : null }
        </Route>
        <Redirect to={`${path}/home`} />
      </Switch>
    </div>
  );
};

export default User;
