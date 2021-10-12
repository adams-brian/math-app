import React, { FunctionComponent, useEffect, useState } from 'react';
import { Mode, getBtn } from '../../modes';

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
    <div className="border-2 border-white gap-6 grid grid-cols-2 grid-rows-2 p-6 rounded-xl md:gap-8 md:p-8 md:rounded-3xl xl:gap-10 xl:p-10">
    {
      answers.map((a, index) => (
        <div key={index} className="relative text-3xl md:text-5xl xl:text-7xl">
          { correctIndex === index ?
              <span className="absolute animate-fade h-full left-0 opacity-0 rounded-2xl shadow-correct top-0 w-full"
                onAnimationEnd={e => {
                  setCorrectIndex(undefined);
                }}>
              </span>
            : <></>
          }
          <button className={`${getBtn(Mode[mode])} border border-gray-800${ incorrectResponses.indexOf(a) === -1 ? ' shadow-none focus:shadow-none ' : ' shadow-incorrect focus:shadow-incorrect ' }h-16 rounded-2xl w-20 z-50 md:h-24 md:rounded-3xl md:w-28 xl:h-32 xl:w-40`} onClick={() => answerSelected(a, index)}>
            <span>{a}</span>
          </button>
        </div>
      ))
    }
    </div>
  );
}

export default MultipleChoice;
