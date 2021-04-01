import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTimes, faDivide } from '@fortawesome/free-solid-svg-icons'
import './index.css';
import Report from './report';
import { Mode } from '../modes';

const Home = () => {
  const [ mode, setMode ] = useState(Mode.addition);
  const [ question, selectQuestion ] = useState<string>();

  const changeMode = (mode: Mode) => {
    selectQuestion(undefined);
    setMode(mode);
  }

  return (
    <div className="report-main">
      <div className="report-tabs">
        <button className={`report-tab report-tab-addition report-tab-${mode === Mode.addition ? 'active' : 'inactive'}`} onClick={() => changeMode(Mode.addition)}><FontAwesomeIcon icon={faPlus}/></button>
        <button className={`report-tab report-tab-subtraction report-tab-${mode === Mode.subtraction ? 'active' : 'inactive'}`} onClick={() => changeMode(Mode.subtraction)}><FontAwesomeIcon icon={faMinus}/></button>
        <button className={`report-tab report-tab-multiplication report-tab-${mode === Mode.multiplication ? 'active' : 'inactive'}`} onClick={() => changeMode(Mode.multiplication)}><FontAwesomeIcon icon={faTimes}/></button>
        <button className={`report-tab report-tab-division report-tab-${mode === Mode.division ? 'active' : 'inactive'}`} onClick={() => changeMode(Mode.division)}><FontAwesomeIcon icon={faDivide}/></button>
      </div>
      <Report mode={mode} question={question} selectQuestion={selectQuestion} />
    </div>
  );
}

export default Home;
