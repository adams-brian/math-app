import React, { useState } from 'react';
import './index.css';

const getNumber = () => Math.floor((Math.random() * 10) + 1);

interface Props {
  goBack: () => void
}

export default (props: Props) => {
  const [n1, setN1] = useState(getNumber());
  const [n2, setN2] = useState(getNumber());
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(false);
  const [incorrect, setIncorrect] = useState(false);

  return (
    <div className="container">
      <div className="go-back" onClick={props.goBack}>Go back</div>
      <div className="question">
        {n1} x {n2} = 
        <input className={
            !correct && !incorrect ? "answer" :
            correct ? "answer correct" : "answer incorrect"}
          type="text" size={2} onBlur={e => {
          e.preventDefault();
          const target = e.currentTarget;
          setTimeout(() => { target.focus(); }, 5);
        }} autoFocus={true}
        onChange={e => setAnswer(e.target.value.replace(/\D/g,''))}
        onAnimationEnd={e => {
          setCorrect(false);
          setIncorrect(false);
        }}
        onKeyUp={e => {
          if (e.key === 'Enter') {
            const answer = Number(e.currentTarget.value);
            if (Number.isInteger(answer) &&  Number(answer) === n1 * n2) {
              setCorrect(true);
              setN1(getNumber());
              setN2(getNumber());
              setAnswer('');
              setScore(score + 1);
            }
            else {
              setIncorrect(true);
              setScore(score - 1);
            }
          }
        }} value={answer}></input>
      </div>
      <div className="score">Score: {score}</div>
    </div>
  );
}