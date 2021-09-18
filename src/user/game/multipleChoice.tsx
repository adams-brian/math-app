import React, { FunctionComponent, useEffect, useState } from 'react';
import { Mode } from '../../modes';
import './multipleChoice.css';

const randomize: (values: number[]) => number[] = values => {
  const result = values.map(v => [v, Math.random()]);
  result.sort((a, b) => a[1] - b[1]);
  return result.map(v => v[0]);
}

const generatePossibleIncorrects = (answer: number, min: number, max: number, range: number, specialWeights: { [key: number]: number }) => {
  const possibleIncorrect: [number, number][] = [];
  let offset = 1;
  while (possibleIncorrect.length < range) {
    if (answer - offset >= min) possibleIncorrect.push([answer - offset, Math.random() * (specialWeights[answer - offset] || 1)]);
    if (answer + offset <= max) possibleIncorrect.push([answer + offset, Math.random() * (specialWeights[answer + offset] || 1)]);
    offset++;
  }
  possibleIncorrect.sort((a, b) => b[1] - a[1]);
  return possibleIncorrect.slice(0, 3).map(v => v[0]);
}

const generateAnswers = (n1: number, n2: number, mode: keyof typeof Mode) => {
  const answers: number[] = [];
  switch (mode) {
    case Mode.addition:
      answers.push(n1 + n2, ...generatePossibleIncorrects(n1 + n2, 0, 30, 6, {
        [n1 + n2 + 1]: 3,
        [n1 + n2 - 1]: 3,
        [n1 + n2 + 2]: 2,
        [n1 + n2 - 2]: 2
      }));
      break;
    case Mode.subtraction:
      answers.push(n2, ...generatePossibleIncorrects(n2, 0, 14, 6, {
        [n2 + 1]: 3,
        [n2 - 1]: 3,
        [n2 + 2]: 2,
        [n2 - 2]: 2
      }));
      break;
    case Mode.multiplication:
      answers.push(n1 * n2, ...generatePossibleIncorrects(n1 * n2, 0, 150, 30, {
        [n1 * n2 + 1]: 3,
        [n1 * n2 - 1]: 3,
        [n1 * n2 + 2]: 2,
        [n1 * n2 - 2]: 2,
        [(n1 + 1) * n2]: 3,
        [(n1 - 1) * n2]: 3,
        [n1 * (n2 + 1)]: 3,
        [n1 * (n2 - 1)]: 3,
        [(n1 + 2) * n2]: 2,
        [(n1 - 2) * n2]: 2,
        [n1 * (n2 + 2)]: 2,
        [n1 * (n2 - 2)]: 2        
      }));
      break;
    case Mode.division:
      answers.push(n2, ...generatePossibleIncorrects(n2, 0, 14, 6, {
        [n2 + 1]: 3,
        [n2 - 1]: 3,
        [n2 + 2]: 2,
        [n2 - 2]: 2
      }));
      break;
  }
  return randomize(answers);
}

const MultipleChoice: FunctionComponent<{
  checkAnswer: (a: number) => boolean,
  n1: number,
  n2: number,
  mode: keyof typeof Mode,
  incorrectResponses: number[]
}> = ({ checkAnswer, n1, n2, mode, incorrectResponses }) => {

  const [answers, setAnswers] = useState([0, 0, 0, 0]);
  const [correctIndex, setCorrectIndex] = useState<number>();

  useEffect(() => void setAnswers(generateAnswers(n1, n2, mode)), [n1, n2, mode]);

  const answerSelected = (answer: number, index: number) => {
    const correct = checkAnswer(answer);
    if (correct) {
      setCorrectIndex(index);
    }
  }

  return (
    <div className="multiple-choice__grid">
    {
      answers.map((a, index) => (
        <div key={index} className="multiple-choice__answer-wrapper">
          { correctIndex === index ?
              <span className="multiple-choice__answer-correct"
                onAnimationEnd={e => {
                  setCorrectIndex(undefined);
                }}>
              </span>
            : <></>
          }
          <button className={`multiple-choice__answer background--${mode}${ incorrectResponses.indexOf(a) === -1 ? '' : ' multiple-choice__answer--incorrect' }`} onClick={() => answerSelected(a, index)}>
            <span className="multiple-choice__answer-text">{a}</span>
          </button>
        </div>
      ))
    }
    </div>
  );
}

export default MultipleChoice;
