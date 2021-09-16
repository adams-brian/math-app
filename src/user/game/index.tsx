import React, { useContext, useState } from 'react';
import { Link, useParams, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons'
import './index.css';
import { DataStoreContext } from '../../dataStore';
import { ConfettiContext } from '../../confetti';
import { Mode, QuestionSet, formatters, checkers } from '../../modes';
import { UserBaseUrlContext } from '..';

const getRandom = (max: number) => Math.floor(Math.random() * (max + 1));

const generatePairs = (min1: number, max1: number, min2: number, max2: number) => {
  const result: [number, number][] = [];
  for (let i = min1; i <= max1; i++) {
    for (let j = min2; j <= max2; j++) {
      result.push([i, j]);
    }
  }
  return result;
}

const randomize: (questions: [number, number][]) => [number, number][] = questions => {
  const result = questions.map(q => [...q, getRandom(1000)]);
  result.sort((a, b) => a[2] - b[2]);
  return result.map(v => [v[0], v[1]]);
}

const digitRegex = /^\d+$/;

const Game = () => {
  const { userId, mode, questionset, count: countString } = useParams<{ userId: string, mode: keyof typeof Mode, questionset: keyof typeof QuestionSet, count: string }>();

  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [correct, setCorrect] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  const [incorrectResponses, setIncorrectResponses] = useState<object[]>([]);
  const [startTime, setStartTime] = useState(Date.now());
  const { logAnswer, getReport, getUserRanges } = useContext(DataStoreContext);
  const launchConfetti = useContext(ConfettiContext);
  const userBaseUrl = useContext(UserBaseUrlContext);
  const history = useHistory();
  const ranges = getUserRanges(userId, Mode[mode]);
  const count = digitRegex.test(countString) ? +countString : (ranges.n1[1] - ranges.n1[0] + 1) * (ranges.n2[1] - ranges.n2[0] + 1);

  const [inputs] = useState(
    questionset === QuestionSet.targeted ?
      randomize(getReport(userId, Mode[mode]).sort((a, b) => b[3] - a[3]).slice(0, count).map(v => [v[0], v[1]])) :
      randomize(generatePairs(ranges.n1[0], ranges.n1[1], ranges.n2[0], ranges.n2[1])).slice(0, count)
  );

  const n1 = inputs[index][0];
  const n2 = inputs[index][1];
  const question = formatters[mode](n1, n2);

  return (
    <div className={`game background-light--${mode}`}>
      <Link className={`link-button link-button--app game__home`} to={`${userBaseUrl}/home`}><FontAwesomeIcon icon={faHome}/></Link>
      <div className="game__question">
        <span>{ question } =</span>
        <span className="game__answer-wrapper">
          { !correct ? <></> :
            <span className="game__answer-correct"
              onAnimationEnd={e => {
                setCorrect(false);
                setIncorrect(false);
              }}>
            </span>
          }
          { !incorrect ? <></> :
            <span className="game__answer-incorrect"
              onAnimationEnd={e => {
                setCorrect(false);
                setIncorrect(false);
              }}>
            </span>
          }
          <input
            className="game__answer"
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
            value={answer}>
          </input>
        </span>
      </div>
      <div className="game__status">
        <div className="game__progress" style={{ width: (100 * index / inputs.length) + "%"}}></div>
      </div>
    </div>
  );
}

export default Game;
