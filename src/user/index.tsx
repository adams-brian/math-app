import React, { useState } from 'react';
import Game from '../game';
import './index.css';

interface Props {
  userId: string,
  userName: string,
  logAnswer: (question: string, startTime: number, endTime: number, incorrectCount: number) => void
}

export enum Mode {
  None,
  Addition,
  Subtraction,
  Multiplication,
  Division
}

const User = (props: Props) => {

  const [mode, setMode] = useState<Mode>(Mode.None);

  const goBack = () => setMode(Mode.None);

  switch (mode) {
    case Mode.Addition:
      return (
        <Game
          formatQuestion={(n1, n2) => `${n1} + ${n2} = `}
          checkAnswer={(n1, n2, a) => n1 + n2 === a}
          goBack={goBack}
          logAnswer={props.logAnswer}
        />
      );
    case Mode.Subtraction:
      return (
        <Game
          formatQuestion={(n1, n2) => `${n1 + n2} - ${n1} = `}
          checkAnswer={(n1, n2, a) => n2 === a}
          goBack={goBack}
          logAnswer={props.logAnswer}
        />
      );
    case Mode.Multiplication:
      return (
        <Game
          formatQuestion={(n1, n2) => `${n1} x ${n2} = `}
          checkAnswer={(n1, n2, a) => n1 * n2 === a}
          goBack={goBack}
          logAnswer={props.logAnswer}
        />
      );
    case Mode.Division:
      return (
        <Game
          formatQuestion={(n1, n2) => `${n1 * n2} ÷ ${n1} = `}
          checkAnswer={(n1, n2, a) => n2 === a}
          goBack={goBack}
          logAnswer={props.logAnswer}
        />
      );
    default:
      return (
        <div className="user-main">
          <div className="welcome">Welcome {props.userName}!</div>
          <div className="modes">
            <button className="mode" onClick={() => setMode(Mode.Addition)}>Addition</button>
            <button className="mode" onClick={() => setMode(Mode.Subtraction)}>Subtraction</button>
            <button className="mode" onClick={() => setMode(Mode.Multiplication)}>Multiplication</button>
            <button className="mode" onClick={() => setMode(Mode.Division)}>Division</button>
          </div>
          { props.userName === "Snappy_Snappy" ? <div className="easter-egg"> CodingStuffs_Yea=Snappy_Snappy idk;what:im.doing</div> : null }
        </div>
      );
  }
};

export default User;
