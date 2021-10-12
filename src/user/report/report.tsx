import React, { useState, useContext } from 'react';
import { Switch, Route, Link, useParams, useRouteMatch } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { Mode, getIcon, getBg } from '../../modes';
import { DataStoreContext } from '../../dataStore';
import { UserBaseUrlContext } from '../';
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
    <Link className="btn btn-xs btn-report" to={`${url}/${q}`} key={q} style={{ backgroundColor: getColorFromScore(score) }} replace><span>{q}</span></Link>);
  const bottom10 = sorted.slice(-10).filter(q => q[3] >= 0).map(([n1, n2, q, score]) =>
    <Link className="btn btn-xs btn-report" to={`${url}/${q}`} key={q} style={{ backgroundColor: getColorFromScore(score) }} replace><span>{q}</span></Link>);

  const reportElements: JSX.Element[] = [];
  for (let j = modeSettings.n2[0]; j <= modeSettings.n2[1]; j++) {
    const currentSet: JSX.Element[] = [];
    for (let i = modeSettings.n1[0]; i <= modeSettings.n1[1]; i++) {
      const q = lookup[i][j][2];
      const score = lookup[i][j][3];
      currentSet.push(
        <Link className="btn btn-xs btn-report" to={`${url}/${q}`} key={q} style={{ backgroundColor: getColorFromScore(score) }} replace><span>{q}</span></Link>
      );
    }
    reportElements.push(
      <div className="flex flex-col gap-1.5 items-center justify-center" key={j}>
        { currentSet }
      </div>
    );
  }
  return (
    <div className={`panel max-w-screen-xl`} onClick={e => setClickCoords([e.clientX, e.clientY])}>
      <div className={`${getBg(Mode[mode])} grid grid-cols-auto-1fr items-start justify-center p-2 w-full`}>
        <Link className={`btn btn-xs-fw btn-app col-start-1 row-start-1 md:btn-sm-fw`} to={`${userBaseUrl}/home`}><FontAwesomeIcon icon={faHome}/></Link>
        <span className="col-start-1 col-end-3 p-2 row-start-1 text-4xl text-gray-500 md:p-3 md:text-5xl"><FontAwesomeIcon icon={getIcon(Mode[mode])}/></span>
      </div>
      <div className={`${getBg(Mode[mode])} flex flex-col gap-4 p-4 md:gap-6 md:p-6`}>
        <section className={`panel ${firstAnsweredIndex < 0 ? ' hidden' : ''}`}>
          <div className={`${getBg(Mode[mode])} p-2 text-2xl`}>Top {top10.length}</div>
          <div className={`${getBg(Mode[mode])} flex flex-wrap gap-1.5 justify-center p-3 md:p-5`}>
            { top10 }
          </div>
        </section>
        <section className={`panel ${firstAnsweredIndex < 0 ? ' hidden' : ''}`}>
          <div className={`${getBg(Mode[mode])} p-2 text-2xl`}>Bottom {bottom10.length}</div>
          <div className={`${getBg(Mode[mode])} flex flex-wrap gap-1.5 justify-center p-3 md:p-5`}>
            { bottom10 }
          </div>
        </section>
        <section className="panel">
          <div className={`${getBg(Mode[mode])} p-2 text-2xl`}>All</div>
          <div className={`${getBg(Mode[mode])} flex flex-wrap gap-x-1.5 gap-y-5 justify-center p-3 md:p-5`}>
            { reportElements }
          </div>
        </section>
      </div>
      <Switch>
        <Route path={`${path}/:question`}>
          <ItemDetails clickCoords={clickCoords} />
        </Route>
      </Switch>
    </div>
  );
}

export default Report;
