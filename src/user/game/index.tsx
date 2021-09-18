import React, { useContext, useState } from 'react';
import { Link, useParams, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons'
import './index.css';
import { DataStoreContext, IncorrectResponseData } from '../../dataStore';
import { ConfettiContext } from '../../confetti';
import { Mode, QuestionSet, formatters, checkers } from '../../modes';
import { UserBaseUrlContext } from '..';
import Text from './text';
import MultipleChoice from './multipleChoice';

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
  const [startTime, setStartTime] = useState(Date.now());
  const [incorrectResponses, setIncorrectResponses] = useState<IncorrectResponseData[]>([]);
  const { logAnswer, getReport, getUserModeSettings } = useContext(DataStoreContext);
  const launchConfetti = useContext(ConfettiContext);
  const userBaseUrl = useContext(UserBaseUrlContext);
  const history = useHistory();
  const modeSettings = getUserModeSettings(userId, Mode[mode]);
  const count = digitRegex.test(countString) ? +countString : (modeSettings.n1[1] - modeSettings.n1[0] + 1) * (modeSettings.n2[1] - modeSettings.n2[0] + 1);

  const [inputs] = useState(
    questionset === QuestionSet.targeted ?
      randomize(getReport(userId, Mode[mode]).sort((a, b) => b[3] - a[3]).slice(0, count).map(v => [v[0], v[1]])) :
      randomize(generatePairs(modeSettings.n1[0], modeSettings.n1[1], modeSettings.n2[0], modeSettings.n2[1])).slice(0, count)
  );

  const n1 = inputs[index][0];
  const n2 = inputs[index][1];
  const question = formatters[mode](n1, n2);

  const checkAnswer = (answer: number) => {
    if (checkers[mode](n1, n2, answer)) {
      logAnswer(userId, question, startTime, Date.now(), incorrectResponses);
      if (index + 1 >= inputs.length) {
        launchConfetti();
        history.replace(`${userBaseUrl}/report/${mode}`);
      }
      setIndex((index + 1) % inputs.length);
      setIncorrectResponses([]);
      setStartTime(Date.now());
      return true;
    } else {
      setIncorrectResponses([{ a: answer, e: Date.now() - startTime }, ...incorrectResponses]);
      return false;
    }
  }

  return (
    <div className={`game background-light--${mode}`}>
      <Link className={`link-button link-button--app game__home`} to={`${userBaseUrl}/home`}><FontAwesomeIcon icon={faHome}/></Link>
      <div className="game__question">
        <span>{ question }<span className="game__question-equals"> =</span></span>
        { modeSettings.m === 0 ?
          <Text checkAnswer={checkAnswer} />
          :
          <MultipleChoice checkAnswer={checkAnswer} n1={n1} n2={n2} mode={mode} incorrectResponses={incorrectResponses.map(r => r.a)} />
        }
      </div>
      <div className="game__status">
        <div className="game__progress" style={{ width: (100 * index / inputs.length) + "%"}}></div>
      </div>
    </div>
  );
}

export default Game;
