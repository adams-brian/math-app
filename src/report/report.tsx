import React from 'react';
import { Switch, Route, useParams, useRouteMatch } from "react-router-dom";
import ItemSummary from './ItemSummary';
import ItemDetails from './ItemDetails';
import { formatters, Mode } from '../user';

export type ResponseData = {
  t: number,
  i: number,
  e: number
}

const getWeightedData = (data: ResponseData[]) => {
  let weightedElapsed = 0, weightedIncorrect = 0, totalWeights = 0;
  for (let i = data.length - 1, w = 1; i >= 0; totalWeights += w, w *= 2, i--) {
    weightedElapsed += data[i].e * w;
    weightedIncorrect += (data[i].i > 0 ? 1 : 0) * w;
  }
  return totalWeights > 0 ? [weightedElapsed / totalWeights, weightedIncorrect / totalWeights] : [0, 0];
}

const Report = () => {
  const { path } = useRouteMatch();
  const params = useParams<{ userId: string, mode: string }>();
  const { userId } = params;
  const mode = params.mode ? Mode[params.mode as keyof typeof Mode] : Mode.addition;

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

  const analyze = (data: ResponseData[]) => {
    const [weightedElapsed, weightedIncorrect] = getWeightedData(data);
    const relativeElapsed = ((weightedElapsed | fastest) - fastest) / ((slowest - fastest) | 1);
    const overallElapsed = allResponseTimes.findIndex(e => e >= weightedElapsed) / allResponseTimes.length;
    const score = (relativeElapsed + overallElapsed + weightedIncorrect) / 3;
    return `rgb(${97 + (253 - 97) * score}, ${223 + (95 - 223) * score}, ${101 + (95 - 101) * score})`;
  }
  
  const summaryList = [];
  for (let i = 1; i <= 12; i++) {
    for (let j = 1; j <= 12; j++) {
      const q = formatters[mode](i, j);
      summaryList.push(<ItemSummary key={q} question={q} color={analyze(data[q])} />);
    }
  }

  return (
    <Switch>
      <Route exact path={`${path}/home`}>
        <section className="report-grid">
          { summaryList }
        </section>
      </Route>
      <Route path={`${path}/details/:question`}>
        <ItemDetails />
      </Route>
    </Switch>
    
  );
}

export default Report;
