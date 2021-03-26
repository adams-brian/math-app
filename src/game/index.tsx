import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import './index.css';

const getNumber = () => Math.floor((Math.random() * 10) + 1);

interface Props {
  goBack: () => void;
  formatQuestion: (n1: number, n2: number) => string;
  checkAnswer: (n1: number, n2: number, a: number) => boolean;
}

const Game = (props: Props) => {
  const [n1, setN1] = useState(getNumber());
  const [n2, setN2] = useState(getNumber());
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(false);
  const [incorrect, setIncorrect] = useState(false);

  return (
    <div className="container">
      <button className="go-back" onClick={props.goBack}><FontAwesomeIcon icon={faArrowLeft}/></button>
      <div className="question">
        { props.formatQuestion(n1, n2) }
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
          }}
          onAnimationEnd={e => {
            setCorrect(false);
            setIncorrect(false);
          }}
          value={answer}>
        </input>
      </div>
      <div className="score">Score: {score}</div>
    </div>
  );
}

export default Game;
