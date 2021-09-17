import React, { useContext, createContext } from 'react';
import { Link, Switch, Route, useParams, Redirect, useRouteMatch } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCog, faUsers, faQuestion } from '@fortawesome/free-solid-svg-icons'
import { DataStoreContext } from '../dataStore';
import Agreement from './agreement';
import Instructions from './instructions';
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
  const { getUserName, getUserSettings } = useContext(DataStoreContext);
  const userName = getUserName(userId);
  const settings = getUserSettings(userId);

  const agreementMatch = useRouteMatch("/user/:userid/agreement");
  if (!settings.pa && !agreementMatch?.isExact) {
    return (<Redirect to={`${url}/agreement`} />);
  }

  return (
    <div className="user">
      <UserBaseUrlContext.Provider value={url}>
        <Switch>
          <Route path={`${path}/agreement`}>
            <Agreement />
          </Route>
          <Route path={`${path}/instructions`}>
            <Instructions />
          </Route>
          <Route path={`${path}/game/:mode/:questionset/:count`}>
            <Game />
          </Route>
          <Route path={`${path}/report`}>
            <Report />
          </Route>
          <Route path={`${path}/settings`}>
            <Settings />
          </Route>
          <Route path={`${path}/home`}>
            <div className="user__header">
              <Link className={`link-button link-button--app user__user-list`} to="/users"><FontAwesomeIcon icon={faUsers}/></Link>
              <span className="user__greeting">Welcome {userName}!</span>
              <Link className={`link-button link-button--app user__instructions`} to={`${url}/instructions`}><FontAwesomeIcon icon={faQuestion}/></Link>
            </div>
            <div className="user__mode-list">
              { (Object.keys(Mode) as (keyof typeof Mode)[]).filter(m => m !== Mode.none).map(m => (<ModeLinks key={m} mode={m} />))}
            </div>
            <Link className="link-button link-button--medium link-button--app" to={`${url}/settings`}><FontAwesomeIcon icon={faUserCog}/><span>Settings</span></Link>
            { userName === "Snappy_Snappy" ? <div className="easter-egg">CodingStuffs_Yea=Snappy_Snappy idk;what:im.doing</div> : null }
          </Route>
          <Redirect to={`${url}/home`} />
        </Switch>
      </UserBaseUrlContext.Provider>
    </div>
  );
};

export default User;
