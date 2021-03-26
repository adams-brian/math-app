import React, { useState, MouseEvent } from 'react';
import Multiplication from '../multiplication';
import Division from '../division';
import './index.css';

interface UserProps {
  userId: string,
  userName: string
}

export enum Mode {
  None,
  Multiplication,
  Division
}

export default (props: UserProps) => {

  const [mode, setMode] = useState<Mode>(Mode.None);

  const goBack = () => setMode(Mode.None);

  switch (mode) {
    case Mode.Multiplication:
      return <Multiplication goBack={goBack} />
    case Mode.Division:
      return <Division goBack={goBack} />
    default:
      return (
        <div className="user-main">
          <div className="welcome">Welcome {props.userName}!</div>
          <div className="modes">
            <div className="mode multiplication" onClick={() => setMode(Mode.Multiplication)}>Multiplication</div>
            <div className="mode division" onClick={() => setMode(Mode.Division)}>Division</div>
          </div>
        </div>
      );
  }
};
