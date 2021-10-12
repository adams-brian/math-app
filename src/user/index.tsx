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
    <div className="flex flex-col items-center">
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
            <div className="gap-4 grid grid-cols-1 w-72 md:grid-cols-2 md:w-144 xl:gap-8">
              <div className="col-span-full flex gap-2 items-start justify-center">
                <Link className={`btn btn-md-fw btn-app flex-none`} to="/users"><FontAwesomeIcon icon={faUsers}/></Link>
                <span className="flex-auto text-center text-xl md:text-3xl xl:text-5xl">Welcome {userName}!</span>
                <Link className={`btn btn-md-fw btn-app flex-none`} to={`${url}/instructions`}><FontAwesomeIcon icon={faQuestion}/></Link>
              </div>
              { (Object.keys(Mode) as (keyof typeof Mode)[]).filter(m => m !== Mode.none).map(m => (<ModeLinks key={m} mode={m} />))}
              <div className="col-span-full flex items-center justify-center">
                <Link className="btn btn-lg btn-app" to={`${url}/settings`}><FontAwesomeIcon icon={faUserCog}/><span>Settings</span></Link>
              </div>
              <div className="col-span-full flex items-center justify-center">
                { userName === "Snappy_Snappy" ? <div className="text-md text-center md:text-xl">CodingStuffs_Yea=Snappy_Snappy idk;what:im.doing</div> : null }
              </div>
            </div>
          </Route>
          <Redirect to={`${url}/home`} />
        </Switch>
      </UserBaseUrlContext.Provider>
    </div>
  );
};

export default User;
