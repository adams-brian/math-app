import React, { FunctionComponent, useState } from 'react';
import './text.css';

const Text: FunctionComponent<{ checkAnswer: (a: number) => boolean }> = ({ checkAnswer }) => {

  const [correct, setCorrect] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  const [answer, setAnswer] = useState('');

  return (
    <span className="text__wrapper">
      { !correct ? <></> :
        <span className="text__answer-correct"
          onAnimationEnd={e => {
            setCorrect(false);
            setIncorrect(false);
          }}>
        </span>
      }
      { !incorrect ? <></> :
        <span className="text__answer-incorrect"
          onAnimationEnd={e => {
            setCorrect(false);
            setIncorrect(false);
          }}>
        </span>
      }
      <input
        className="text__answer"
        type="number"
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
            if (e.currentTarget.value.length > 0) {
              if (checkAnswer(Number(e.currentTarget.value))) {
                setCorrect(true);
                setAnswer('');
              }
              else {
                setIncorrect(true);
              }
            }
          }
        }}
        value={answer}>
      </input>
    </span>
  );
}

export default Text;
