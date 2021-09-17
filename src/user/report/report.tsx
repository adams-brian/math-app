import React, { useState, useContext } from 'react';
import { Switch, Route, Link, useParams, useRouteMatch } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { Mode, getIcon } from '../../modes';
import { DataStoreContext } from '../../dataStore';
import { UserBaseUrlContext } from '../';
import './report.css';
import ItemDetails from './ItemDetails';

const getColorFromScore = (score: number) => score >= 0 ?
  `rgb(${97 + (253 - 97) * score}, ${223 + (95 - 223) * score}, ${101 + (95 - 101) * score})`
  : 'transparent';

const Report = () => {
  const { userId, mode } = useParams<{ userId: string, mode: keyof typeof Mode }>();
  const { path, url } = useRouteMatch();
  const { getReport, getUserModeSettings } = useContext(DataStoreContext);
  const userBaseUrl = useContext(UserBaseUrlContext);
  const [ clickCoords, setClickCoords ] = useState([0, 0]);

  const questionAndScore = getReport(userId, Mode[mode]);
  const modeSettings = getUserModeSettings(userId, Mode[mode]);
  const lookup = questionAndScore.reduce<{ [key: number]: { [key: number]: [number, number, string, number] } }>((a, c) => {
    if (!a[c[0]]) a[c[0]] = {};
    a[c[0]][c[1]] = c;
    return a;
  }, {});
  const sorted = [...questionAndScore];
  sorted.sort((a, b) => a[3] - b[3]);
  const firstAnsweredIndex = sorted.findIndex(q => q[3] >= 0);
  const top10Start = Math.max(firstAnsweredIndex, 0);

  const top10 = sorted.slice(top10Start, top10Start + 10).map(([n1, n2, q, score]) =>
    <Link className="link-button link-button--xsmall link-button--report" to={`${url}/${q}`} key={q} style={{ backgroundColor: getColorFromScore(score) }} replace><span>{q}</span></Link>);
  const bottom10 = sorted.slice(-10).filter(q => q[3] >= 0).map(([n1, n2, q, score]) =>
    <Link className="link-button link-button--xsmall link-button--report" to={`${url}/${q}`} key={q} style={{ backgroundColor: getColorFromScore(score) }} replace><span>{q}</span></Link>);

  const reportElements: JSX.Element[] = [];
  for (let j = modeSettings.n2[0]; j <= modeSettings.n2[1]; j++) {
    const currentSet: JSX.Element[] = [];
    for (let i = modeSettings.n1[0]; i <= modeSettings.n1[1]; i++) {
      const q = lookup[i][j][2];
      const score = lookup[i][j][3];
      currentSet.push(
        <Link className="link-button link-button--xsmall link-button--report" to={`${url}/${q}`} key={q} style={{ backgroundColor: getColorFromScore(score) }} replace><span>{q}</span></Link>
      );
    }
    reportElements.push(
      <div className="report__set" key={j}>
        { currentSet }
      </div>
    );
  }
  return (
    <div className={`report background-light--${mode}`} onClick={e => setClickCoords([e.clientX, e.clientY])}>
      <div className="report__header">
        <Link className={`link-button link-button--app report__home`} to={`${userBaseUrl}/home`}><FontAwesomeIcon icon={faHome}/></Link>
        <FontAwesomeIcon icon={getIcon(Mode[mode])}/>
      </div>
      <div className={`report__leaderboards${firstAnsweredIndex < 0 ? ' report__leaderboards--empty' : ''}`}>
        <section className="report__leaderboard">
          <div className="report__leaderboard-header">Top {top10.length}</div>
          <div className="report__leaderboard-body">
            { top10 }
          </div>
        </section>
        <section className="report__leaderboard">
          <div className="report__leaderboard-header">Bottom {bottom10.length}</div>
          <div className="report__leaderboard-body">
            { bottom10 }
          </div>
        </section>
      </div>
      <section className="report__leaderboard">
        <div className="report__leaderboard-header">All</div>
        <div className="report__sets">
          { reportElements }
        </div>
      </section>
      <Switch>
        <Route path={`${path}/:question`}>
          <ItemDetails clickCoords={clickCoords} />
        </Route>
      </Switch>
    </div>
  );
}

export default Report;
