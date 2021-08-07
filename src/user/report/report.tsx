import React, { useState, useContext } from 'react';
import { Switch, Route, Link, useParams, useRouteMatch } from "react-router-dom";
import { Mode } from '../../modes';
import { DataStoreContext } from '../../dataStore';
import './report.css';
import ItemDetails from './ItemDetails';

const getColorFromScore = (score: number) => score >= 0 ?
  `rgb(${97 + (253 - 97) * score}, ${223 + (95 - 223) * score}, ${101 + (95 - 101) * score})`
  : 'transparent';

const Report = () => {
  const { userId, mode } = useParams<{ userId: string, mode: keyof typeof Mode }>();
  const { path, url } = useRouteMatch();
  const { getReport, getUserRanges } = useContext(DataStoreContext);
  const [ clickCoords, setClickCoords ] = useState([0, 0]);

  const questionAndScore = getReport(userId, Mode[mode]);
  const sorted = [...questionAndScore];
  sorted.sort((a, b) => a[3] - b[3]);
  let firstAnsweredIndex = sorted.findIndex(q => q[3] >= 0);
  if (firstAnsweredIndex === -1) firstAnsweredIndex = 0;

  const ranges = getUserRanges(userId, Mode[mode]);

  const top10 = sorted.slice(firstAnsweredIndex, firstAnsweredIndex + 10).map(([n1, n2, q, score]) =>
    <Link className="link-button report-summary-item" to={`${url}/${q}`} key={q} style={{ backgroundColor: getColorFromScore(score) }} replace>{q}</Link>);
  const bottom10 = sorted.slice(-10).filter(q => q[3] >= 0).map(([n1, n2, q, score]) =>
    <Link className="link-button report-summary-item" to={`${url}/${q}`} key={q} style={{ backgroundColor: getColorFromScore(score) }} replace>{q}</Link>);

  return (
    <div className={`report-body background-light-${mode}`} onClick={e => setClickCoords([e.clientX, e.clientY])}>
      <section className="leaderboard">{ top10 }</section>
      <section className="leaderboard">{ bottom10 }</section>
      <section className="report-grid" style={{ gridTemplateRows: `repeat(${ranges.n1[1] - ranges.n1[0] + 1}, auto)`, gridTemplateColumns: `repeat(${ranges.n2[1] - ranges.n2[0] + 1}, auto)` }}>
        { questionAndScore.map(([n1, n2, q, score]) => (<Link className="link-button report-summary-item" to={`${url}/${q}`} key={q} style={{ backgroundColor: getColorFromScore(score) }} replace>{q}</Link>)) }
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
