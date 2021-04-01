import React, { useContext } from 'react';
import { Link, Switch, Route, useParams, Redirect, useRouteMatch } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTimes, faDivide, faChartLine } from '@fortawesome/free-solid-svg-icons'
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
      <Switch>
        <Route path={`${path}/game/:mode`}>
          <Game />
        </Route>
        <Route path={`${path}/report`}>
          <Report />
        </Route>
        <Route path={`${path}/home`}>
          <div className="user-header">{userName}</div>
          <div className="mode-link-list">
            <Link className="mode-link addition-link link-button" to={`${url}/game/addition`}><FontAwesomeIcon icon={faPlus}/></Link>
            <Link className="mode-link subtraction-link link-button" to={`${url}/game/subtraction`}><FontAwesomeIcon icon={faMinus}/></Link>
            <Link className="mode-link multiplication-link link-button" to={`${url}/game/multiplication`}><FontAwesomeIcon icon={faTimes}/></Link>
            <Link className="mode-link division-link link-button" to={`${url}/game/division`}><FontAwesomeIcon icon={faDivide}/></Link>
          </div>
          <Link className="mode-link report-link link-button" to={`${url}/report`}><FontAwesomeIcon icon={faChartLine}/></Link>
          { userName === "Snappy_Snappy" ? <div className="easter-egg">CodingStuffs_Yea=Snappy_Snappy idk;what:im.doing</div> : null }
        </Route>
        <Redirect to={`${path}/home`} />
      </Switch>
    </div>
  );
};

export default User;
