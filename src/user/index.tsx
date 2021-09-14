import React, { useContext, createContext } from 'react';
import { Link, Switch, Route, useParams, Redirect, useRouteMatch } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCog } from '@fortawesome/free-solid-svg-icons'
import { DataStoreContext } from '../dataStore';
import Game from './game';
import Report from './report';
import Settings from './settings';
import ModeLinks from './modeLinks';
import { Mode } from '../modes';
import './index.css';

export const UserBaseUrlContext = createContext('');

const User = () => {
  const { userId } = useParams<{ userId: string }>();
  const { path, url } = useRouteMatch();
  const { getUserName } = useContext(DataStoreContext);
  const userName = getUserName(userId);

  return (
    <div className="user">
      <UserBaseUrlContext.Provider value={url}>
        <Switch>
          <Route path={`${path}/game/:mode/:questionset`}>
            <Game />
          </Route>
          <Route path={`${path}/report`}>
            <Report />
          </Route>
          <Route path={`${path}/settings`}>
            <Settings />
          </Route>
          <Route path={`${path}/home`}>
            <div className="user__greeting">Welcome {userName}!</div>
            <div className="user__mode-list">
              { (Object.keys(Mode) as (keyof typeof Mode)[]).filter(m => m !== Mode.none).map(m => (<ModeLinks key={m} mode={m} />))}
            </div>
            <Link className="link-button link-button--medium link-button--app" to={`${url}/settings`}><FontAwesomeIcon icon={faUserCog}/><span>Settings</span></Link>
            { userName === "Snappy_Snappy" ? <div className="easter-egg">CodingStuffs_Yea=Snappy_Snappy idk;what:im.doing</div> : null }
          </Route>
          <Redirect to={`${path}/home`} />
        </Switch>
      </UserBaseUrlContext.Provider>
    </div>
  );
};

export default User;
