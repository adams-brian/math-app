import React, { useContext, useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
import './index.css';
import { DataStoreContext } from '../dataStore';
import { ConfettiContext } from '../confetti';
import { Mode, formatters, checkers } from '../modes';
import { UserBaseUrlContext } from '../user';

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

const Game = () => {
  const { userId, mode } = useParams<{ userId: string, mode: keyof typeof Mode }>();

  const [inputs] = useState(generatePairs(12));
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [correct, setCorrect] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  const [incorrectResponses, setIncorrectResponses] = useState<object[]>([]);
  const [startTime, setStartTime] = useState(Date.now());
  const { logAnswer } = useContext(DataStoreContext);
  const launchConfetti = useContext(ConfettiContext);
  const userBaseUrl = useContext(UserBaseUrlContext);
  const history = useHistory();

  const n1 = inputs[index][0];
  const n2 = inputs[index][1];
  const question = formatters[mode](n1, n2);

  return (
    <div className={`game-container game-${mode}`}>
      <div className="game-question">
        { question } =
        <input
          className={
            !correct && !incorrect ? "game-answer" :
            correct ? "game-answer correct-answer" : "game-answer incorrect-answer"
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
              if (e.currentTarget.value.length > 0) {
                const answer = Number(e.currentTarget.value);
                if (checkers[mode](n1, n2, answer)) {
                  logAnswer(userId, question, startTime, Date.now(), incorrectResponses);
                  setCorrect(true);
                  if (index + 1 >= inputs.length) {
                    launchConfetti();
                    history.replace(`${userBaseUrl}/report/${mode}`);
                  }
                  setIndex((index + 1) % inputs.length);
                  setAnswer('');
                  setIncorrectResponses([]);
                  setStartTime(Date.now());
                }
                else {
                  setIncorrect(true);
                  setIncorrectResponses([{ a: answer, e: Date.now() - startTime }, ...incorrectResponses]);
                }
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
      <div className="game-status">
        <div className="game-progress" style={{ width: (100 * index / inputs.length) + "%"}}></div>
      </div>
    </div>
  );
}

export default Game;
