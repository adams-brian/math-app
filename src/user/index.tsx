import React from 'react';
import { Link, Switch, Route, useParams, Redirect, useRouteMatch } from "react-router-dom";
import Game from '../game';
import Report from '../report';
import './index.css';

interface Props {
  getUserName: (id: string) => string;
  logAnswer: (userId: string, question: string, startTime: number, endTime: number, incorrectCount: number) => void;
}

export enum Mode {
  none = 'none',
  addition = 'addition',
  subtraction = 'subtraction',
  multiplication = 'multiplication',
  division = 'division'
}

export const formatters: { [key in Mode]: (n1: number, n2: number) => string } = {
  [Mode.none]: (n1, n2) => { throw new Error('formatter called on mode None') },
  [Mode.addition]: (n1, n2) => `${n1} + ${n2}`,
  [Mode.subtraction]: (n1, n2) => `${n1 + n2} - ${n1}`,
  [Mode.multiplication]: (n1, n2) => `${n1} x ${n2}`,
  [Mode.division]: (n1, n2) => `${n1 * n2} ÷ ${n1}`
};

const User = (props: Props) => {
  const { userId } = useParams<{ userId: string }>();
  const userName = props.getUserName(userId);
  let { path, url } = useRouteMatch();

  return (
    <div className="user-main">
      <div className="welcome">Welcome {userName}!</div>
      <Switch>
        <Route path={`${path}/game/addition`}>
          <Game
            formatQuestion={formatters[Mode.addition]}
            checkAnswer={(n1, n2, a) => n1 + n2 === a}
            logAnswer={props.logAnswer}
          />
        </Route>
        <Route path={`${path}/game/subtraction`}>
          <Game
            formatQuestion={formatters[Mode.subtraction]}
            checkAnswer={(n1, n2, a) => n2 === a}
            logAnswer={props.logAnswer}
          />
        </Route>
        <Route path={`${path}/game/multiplication`}>
          <Game
            formatQuestion={formatters[Mode.multiplication]}
            checkAnswer={(n1, n2, a) => n1 * n2 === a}
            logAnswer={props.logAnswer}
          />
        </Route>
        <Route path={`${path}/game/division`}>
          <Game
            formatQuestion={formatters[Mode.division]}
            checkAnswer={(n1, n2, a) => n2 === a}
            logAnswer={props.logAnswer}
          />
        </Route>
        <Route path={`${path}/report`}>
          <Report />
        </Route>
        <Route path={`${path}/home`}>
          <div className="modes">
            <Link className="mode link-button" to={`${url}/game/addition`}>Addition</Link>
            <Link className="mode link-button" to={`${url}/game/subtraction`}>Subtraction</Link>
            <Link className="mode link-button" to={`${url}/game/multiplication`}>Multiplication</Link>
            <Link className="mode link-button" to={`${url}/game/division`}>Division</Link>
          </div>
          <Link className="mode link-button" to={`${url}/report/home`}>Report</Link>
          { userName === "Snappy_Snappy" ? <div className="easter-egg"> CodingStuffs_Yea=Snappy_Snappy idk;what:im.doing</div> : null }
        </Route>
        <Redirect to={`${path}/home`} />
      </Switch>
    </div>
  );
};

export default User;
