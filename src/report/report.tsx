import React, { useState } from 'react';
import { Switch, Route, Link, useParams, useRouteMatch } from "react-router-dom";
import { formatters, Mode } from '../modes';
import './report.css';
import ItemDetails from './ItemDetails';

type IncorrectResponseData = {
  a: number;
  e: number;
}

export type ResponseData = {
  t: number;
  i: IncorrectResponseData[];
  e: number;
}

const getWeightedData = (data: ResponseData[]) => {
  let weightedElapsed = 0, weightedIncorrect = 0, totalWeights = 0;
  for (let i = data.length - 1, w = 1; i >= 0; totalWeights += w, w *= 2, i--) {
    weightedElapsed += data[i].e * w;
    weightedIncorrect += (data[i].i.length > 0 ? 1 : 0) * w;
  }
  return totalWeights > 0 ? [weightedElapsed / totalWeights, weightedIncorrect / totalWeights] : [0, 0];
}

const getColorFromScore = (score: number) => `rgb(${97 + (253 - 97) * score}, ${223 + (95 - 223) * score}, ${101 + (95 - 101) * score})`;

const Report = () => {
  const { userId, mode } = useParams<{ userId: string, mode: keyof typeof Mode }>();
  const { path, url } = useRouteMatch();
  const [ clickCoords, setClickCoords ] = useState([0, 0]);

  const data: { [key: string]: ResponseData[] } = {};

  const allResponseTimes: number[] = [];
  for (let i = 1; i <= 12; i++) {
    for (let j = 1; j <= 12; j++) {
      const q = formatters[mode](i, j);
      data[q] = JSON.parse(localStorage.getItem(`${userId} ${q}`) || '[]');
      data[q].forEach(o => allResponseTimes.push(o.e));
    }
  }
  allResponseTimes.sort((a, b) => a - b);
  const fastest = allResponseTimes[0];
  const slowest = allResponseTimes[allResponseTimes.length - 1];

  const getScore = (data: ResponseData[]) => {
    const [weightedElapsed, weightedIncorrect] = getWeightedData(data);
    const relativeElapsed = ((weightedElapsed | fastest) - fastest) / ((slowest - fastest) | 1);
    const overallElapsed = allResponseTimes.findIndex(e => e >= weightedElapsed) / allResponseTimes.length;
    return (relativeElapsed + overallElapsed + weightedIncorrect) / 3;
  }

  const summaryList = [];
  const questionAndScore: [string, number][] = [];
  for (let i = 1; i <= 12; i++) {
    for (let j = 1; j <= 12; j++) {
      const q = formatters[mode](i, j);
      const score = getScore(data[q]);
      questionAndScore.push([q, score]);
      summaryList.push(<Link className="link-button report-summary-item" to={`${url}/${q}`} key={q} style={{ backgroundColor: getColorFromScore(score) }} replace>{q}</Link>);
    }
  }
  questionAndScore.sort((a, b) => a[1] - b[1]);
  const top10 = questionAndScore.slice(0, 10).map(([q, score]) =>
    <Link className="link-button report-summary-item" to={`${url}/${q}`} key={q} style={{ backgroundColor: getColorFromScore(score) }} replace>{q}</Link>);
  const bottom10 = questionAndScore.slice(-10).map(([q, score]) =>
    <Link className="link-button report-summary-item" to={`${url}/${q}`} key={q} style={{ backgroundColor: getColorFromScore(score) }} replace>{q}</Link>);

  return (
    <div className={`report-body report-body-${mode}`} onClick={e => setClickCoords([e.clientX, e.clientY])}>
      <section className="leaderboard">{ top10 }</section>
      <section className="leaderboard">{ bottom10 }</section>
      <section className="report-grid">
        { summaryList }
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
