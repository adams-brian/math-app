import React, { useState, useContext } from 'react';
import { Switch, Route, Link, useParams, useRouteMatch } from "react-router-dom";
import { Mode } from '../../modes';
import { DataStoreContext } from '../../dataStore';
import './report.css';
import ItemDetails from './ItemDetails';

const getColorFromScore = (score: number) => `rgb(${97 + (253 - 97) * score}, ${223 + (95 - 223) * score}, ${101 + (95 - 101) * score})`;

const Report = () => {
  const { userId, mode } = useParams<{ userId: string, mode: keyof typeof Mode }>();
  const { path, url } = useRouteMatch();
  const { getReport } = useContext(DataStoreContext);
  const [ clickCoords, setClickCoords ] = useState([0, 0]);

  const questionAndScore = getReport(userId, Mode[mode]);
  const sorted = [...questionAndScore];
  sorted.sort((a, b) => a[3] - b[3]);

  const top10 = sorted.slice(0, 10).map(([n1, n2, q, score]) =>
    <Link className="link-button report-summary-item" to={`${url}/${q}`} key={q} style={{ backgroundColor: getColorFromScore(score) }} replace>{q}</Link>);
  const bottom10 = sorted.slice(-10).map(([n1, n2, q, score]) =>
    <Link className="link-button report-summary-item" to={`${url}/${q}`} key={q} style={{ backgroundColor: getColorFromScore(score) }} replace>{q}</Link>);

  return (
    <div className={`report-body background-light-${mode}`} onClick={e => setClickCoords([e.clientX, e.clientY])}>
      <section className="leaderboard">{ top10 }</section>
      <section className="leaderboard">{ bottom10 }</section>
      <section className="report-grid">
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
