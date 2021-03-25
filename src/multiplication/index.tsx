import React, { useState } from 'react';
import './index.css';

const getNumber = () => Math.floor((Math.random() * 10) + 1);

export default () => {
  const [n1, setN1] = useState(getNumber());
  const [n2, setN2] = useState(getNumber());
  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState('');
  const [score, setScore] = useState(0);

  return (
    <div className="container">
      <div className="question">
        {n1} x {n2}
      </div>
      <div className="answer">
        <input type="text" onBlur={e => {
          e.preventDefault();
          const target = e.currentTarget;
          setTimeout(() => { target.focus(); }, 5);
        }} autoFocus={true}
        onChange={e => setAnswer(e.target.value)}
        onKeyUp={e => {
          if (e.key === 'Enter') {
            const answer = Number(e.currentTarget.value);
            if (Number.isInteger(answer) &&  Number(answer) === n1 * n2) {
              setStatus('Correct!');
              setN1(getNumber());
              setN2(getNumber());
              setAnswer('');
              setScore(score + 1);
            }
            else {
              setStatus('Incorrect');
              setScore(score - 1);
            }
          }
        }} value={answer}></input>
      </div>
      <div className="status">{status}</div>
      <div className="score">Score: {score}</div>
    </div>
  );
}