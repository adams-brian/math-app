import React, { FunctionComponent, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTimes, faDivide, faBullseye } from '@fortawesome/free-solid-svg-icons';
import { UserBaseUrlContext } from './';
import { DataStoreContext } from '../dataStore';
import { Mode, formatters } from '../modes';
import './modeLinks.css';

const THRESHOLD = 3;

const ModeLinks: FunctionComponent<{ mode: keyof typeof Mode }> = ({ mode }) => {

  const { userId } = useParams<{ userId: string }>();
  const userBaseUrl = useContext(UserBaseUrlContext);
  const { getQuestionResponseData } = useContext(DataStoreContext);

  let icon = faPlus;
  switch (mode) {
    case Mode.addition:
      icon = faPlus;
      break;
    case Mode.subtraction:
      icon = faMinus;
      break;
    case Mode.multiplication:
      icon = faTimes;
      break;
    case Mode.division:
      icon = faDivide;
      break;
  }

  let min = THRESHOLD;
  for (let i = 1; i <= 12; i++) {
    for (let j = 1; j <= 12; j++) {
      min = Math.min(min, getQuestionResponseData(userId, formatters[mode](i, j)).length);
    }
  }
  console.log(min);

  return (
    <div className="mode-links">
      <Link className={`mode-link background-${mode} link-button`} to={`${userBaseUrl}/game/${mode}/all`}><FontAwesomeIcon icon={icon}/></Link>
      <div className={`mode-targeted${min < THRESHOLD ? ' mode-targeted-hidden' : ''}`}>
        <Link className={`link-button mode-targeted-link background-${mode}`} to={`${userBaseUrl}/game/${mode}/targeted/5`} replace><FontAwesomeIcon icon={faBullseye}/><span className="mode-targeted-count">5</span></Link>
        <Link className={`link-button mode-targeted-link background-${mode}`} to={`${userBaseUrl}/game/${mode}/targeted/10`} replace><FontAwesomeIcon icon={faBullseye}/><span className="mode-targeted-count">10</span></Link>
        <Link className={`link-button mode-targeted-link background-${mode}`} to={`${userBaseUrl}/game/${mode}/targeted/25`} replace><FontAwesomeIcon icon={faBullseye}/><span className="mode-targeted-count">25</span></Link>
      </div>
    </div>
  );
}

export default ModeLinks;
