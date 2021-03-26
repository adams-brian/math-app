import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import './index.css';

const getRandom = (max: number) => Math.floor(Math.random() * (max + 1));

const generatePairs = (max: number) => {
  const result: number[][] = [];
  for (let i = 1; i <= max; i++) {
    for (let j = 1; j <= max; j++) {
      result.push([i, j, getRandom(1000)]);
    }
  }
  result.sort((a, b) => a[2] - b[2]);
  return result.map(v => [v[0], v[1]]);
}

interface Props {
  goBack: () => void,
  formatQuestion: (n1: number, n2: number) => string,
  checkAnswer: (n1: number, n2: number, a: number) => boolean,
  logAnswer: (question: string, startTime: number, endTime: number, incorrectCount: number) => void
}

const Game = (props: Props) => {
  const [inputs] = useState(generatePairs(12));
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [correct, setCorrect] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());

  const n1 = inputs[index][0];
  const n2 = inputs[index][1];
  const question = props.formatQuestion(n1, n2);

  return (
    <div className="container">
      <button className="go-back" onClick={props.goBack}><FontAwesomeIcon icon={faArrowLeft}/></button>
      <div className="question">
        { question }
        <input
          className={
            !correct && !incorrect ? "answer" :
            correct ? "answer correct" : "answer incorrect"
          }
          type="text"
          size={2}
          autoFocus={true}
          onBlur={e => {
            e.preventDefault();
            const target = e.currentTarget;
            setTimeout(() => { target.focus(); }, 0);
          }}
          onChange={e => setAnswer(e.target.value.replace(/\D/g,''))}
          onKeyUp={e => {
            if (e.key === 'Enter') {
              const answer = Number(e.currentTarget.value);
              if (Number.isInteger(answer) && props.checkAnswer(n1, n2, answer)) {
                props.logAnswer(question, startTime, Date.now(), incorrectCount);
                setCorrect(true);
                setIndex((index + 1) % inputs.length);
                setAnswer('');
                setIncorrectCount(0);
                setStartTime(Date.now());
              }
              else {
                setIncorrect(true);
                setIncorrectCount(incorrectCount + 1);
              }
            }
          }}
          onAnimationEnd={e => {
            setCorrect(false);
            setIncorrect(false);
          }}
          value={answer}>
        </input>
      </div>
      <div className="status"><div className="progress" style={{ width: (100 * index / inputs.length) + "%"}}></div></div>
    </div>
  );
}

export default Game;
