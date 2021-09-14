import React, { FunctionComponent, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye, faDice, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { UserBaseUrlContext } from './';
import { DataStoreContext } from '../dataStore';
import { Mode, formatters, getIcon } from '../modes';
import './modeLinks.css';

const THRESHOLD = 1;

const ModeLinks: FunctionComponent<{ mode: keyof typeof Mode }> = ({ mode }) => {

  const { userId } = useParams<{ userId: string }>();
  const userBaseUrl = useContext(UserBaseUrlContext);
  const { getQuestionResponseData, getUserRanges } = useContext(DataStoreContext);

  const ranges = getUserRanges(userId, Mode[mode]);

  let min = THRESHOLD;
  for (let i = ranges.n1[0]; i <= ranges.n1[1]; i++) {
    for (let j = ranges.n2[0]; j <= ranges.n2[1]; j++) {
      min = Math.min(min, getQuestionResponseData(userId, formatters[mode](i, j)).length);
    }
  }

  return (
    <div className={`mode-links background-light--${mode}`}>
      <div className="mode-links__header">
        <FontAwesomeIcon icon={getIcon(Mode[mode])}/>
      </div>
      <Link className={`link-button link-button--large link-button--${mode}`} to={`${userBaseUrl}/game/${mode}/random/all`}><FontAwesomeIcon icon={faDice}/><span>All</span></Link>
      <div className="mode-links__subsets">
        <div className="mode-links__subset">
          <Link className={`link-button link-button--small link-button--${mode}`} to={`${userBaseUrl}/game/${mode}/random/10`}><FontAwesomeIcon icon={faDice}/><span>10</span></Link>
          <Link className={`link-button link-button--small link-button--${mode}`} to={`${userBaseUrl}/game/${mode}/random/25`}><FontAwesomeIcon icon={faDice}/><span>25</span></Link>
          <Link className={`link-button link-button--small link-button--${mode}`} to={`${userBaseUrl}/game/${mode}/random/50`}><FontAwesomeIcon icon={faDice}/><span>50</span></Link>
        </div>
        <div className={`mode-links__subset${min < THRESHOLD ? ' mode-links__subset--hidden' : ''}`}>
          <Link className={`link-button link-button--small link-button--${mode}`} to={`${userBaseUrl}/game/${mode}/targeted/5`}><FontAwesomeIcon icon={faBullseye}/><span>5</span></Link>
          <Link className={`link-button link-button--small link-button--${mode}`} to={`${userBaseUrl}/game/${mode}/targeted/10`}><FontAwesomeIcon icon={faBullseye}/><span>10</span></Link>
          <Link className={`link-button link-button--small link-button--${mode}`} to={`${userBaseUrl}/game/${mode}/targeted/25`}><FontAwesomeIcon icon={faBullseye}/><span>25</span></Link>
        </div>
      </div>
      <Link className={`link-button link-button--medium link-button--${mode}`} to={`${userBaseUrl}/report/${mode}`}><FontAwesomeIcon icon={faChartLine}/><span>Report</span></Link>
    </div>
  );
}

export default ModeLinks;
