import React, { useState, MouseEvent } from 'react';
import Game from '../game';
import './index.css';

interface UserProps {
  userId: string,
  userName: string
}

export enum Mode {
  None,
  Addition,
  Subtraction,
  Multiplication,
  Division
}

export default (props: UserProps) => {

  const [mode, setMode] = useState<Mode>(Mode.None);

  const goBack = () => setMode(Mode.None);

  switch (mode) {
    case Mode.Addition:
      return (
        <Game
          formatQuestion={(n1, n2) => `${n1} + ${n2} = `}
          checkAnswer={(n1, n2, a) => n1 + n2 === a}
          goBack={goBack}
        />
      );
    case Mode.Subtraction:
      return (
        <Game
          formatQuestion={(n1, n2) => `${n1 + n2} - ${n1} = `}
          checkAnswer={(n1, n2, a) => n2 === a}
          goBack={goBack}
        />
      );
    case Mode.Multiplication:
      return (
        <Game
          formatQuestion={(n1, n2) => `${n1} x ${n2} = `}
          checkAnswer={(n1, n2, a) => n1 * n2 === a}
          goBack={goBack}
        />
      );
    case Mode.Division:
      return (
        <Game
          formatQuestion={(n1, n2) => `${n1 * n2} ÷ ${n1} = `}
          checkAnswer={(n1, n2, a) => n2 === a}
          goBack={goBack}
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
