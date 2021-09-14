import React, { useContext, useState } from 'react';
import { Link, useParams, useHistory, useRouteMatch } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons'
import './index.css';
import { DataStoreContext } from '../../dataStore';
import { ConfettiContext } from '../../confetti';
import { Mode, QuestionSet, formatters, checkers } from '../../modes';
import { UserBaseUrlContext } from '..';

const getRandom = (max: number) => Math.floor(Math.random() * (max + 1));

const generatePairs = (min1: number, max1: number, min2: number, max2: number) => {
  const result: number[][] = [];
  for (let i = min1; i <= max1; i++) {
    for (let j = min2; j <= max2; j++) {
      result.push([i, j]);
    }
  }
  return result;
}

const randomize = (questions: number[][]) => {
  const result = questions.map(q => [...q, getRandom(1000)]);
  result.sort((a, b) => a[2] - b[2]);
  return result.map(v => [v[0], v[1]]);
}

const Game = () => {
  const { userId, mode, questionset } = useParams<{ userId: string, mode: keyof typeof Mode, questionset: keyof typeof QuestionSet }>();

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
  const targetedCount = Number(useRouteMatch<{ count: string }>(`${userBaseUrl}/game/:mode/targeted/:count`)?.params?.count || '10');
  const ranges = getUserRanges(userId, Mode[mode]);

  const [inputs] = useState(
    randomize(
      questionset === QuestionSet.targeted ?
        getReport(userId, Mode[mode]).sort((a, b) => b[3] - a[3]).slice(0, targetedCount).map(v => [v[0], v[1]]) :
        generatePairs(ranges.n1[0], ranges.n1[1], ranges.n2[0], ranges.n2[1])
    )
  );

  const n1 = inputs[index][0];
  const n2 = inputs[index][1];
  const question = formatters[mode](n1, n2);

  return (
    <div className={`game background-light--${mode}`}>
      <Link className={`link-button link-button--medium link-button--app game__home`} to={`${userBaseUrl}/home`}><FontAwesomeIcon icon={faHome}/></Link>
      <div className="game__question">
        { question } =
        <input
          className={
            !correct && !incorrect ? "game__answer" :
            correct ? "game__answer game__answer--correct" : "game__answer game__answer--incorrect"
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
      <div className="game__status">
        <div className="game__progress" style={{ width: (100 * index / inputs.length) + "%"}}></div>
      </div>
    </div>
  );
}

export default Game;
