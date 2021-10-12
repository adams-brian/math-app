import React, { FunctionComponent, useState } from 'react';

const Text: FunctionComponent<{ checkAnswer: (a: number) => boolean }> = ({ checkAnswer }) => {

  const [correct, setCorrect] = useState(false);
  const [incorrect, setIncorrect] = useState(false);
  const [answer, setAnswer] = useState('');

  return (
    <span className="relative">
      { !correct ? <></> :
        <span className="absolute animate-fade h-full left-0 opacity-0 rounded-2xl shadow-correct top-0 w-full md:rounded-3xl"
          onAnimationEnd={e => {
            setCorrect(false);
            setIncorrect(false);
          }}>
        </span>
      }
      { !incorrect ? <></> :
        <span className="absolute animate-fade h-full left-0 opacity-0 rounded-2xl shadow-incorrect top-0 w-full md:rounded-3xl"
          onAnimationEnd={e => {
            setCorrect(false);
            setIncorrect(false);
          }}>
        </span>
      }
      <input
        className="border border-gray-600 px-3 py-2 rounded-2xl text-center w-36 md:rounded-3xl md:w-60 xl:px-5 xl:py-4 xl:text-left xl:w-80 focus:outline-none"
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
