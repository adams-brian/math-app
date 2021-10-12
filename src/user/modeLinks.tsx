import React, { FunctionComponent, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye, faDice, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { UserBaseUrlContext } from './';
import { DataStoreContext } from '../dataStore';
import { Mode, formatters, getIcon, getBg, getBtn } from '../modes';

const THRESHOLD = 1;

const ModeLinks: FunctionComponent<{ mode: keyof typeof Mode }> = ({ mode }) => {

  const { userId } = useParams<{ userId: string }>();
  const userBaseUrl = useContext(UserBaseUrlContext);
  const { getQuestionResponseData, getUserModeSettings } = useContext(DataStoreContext);

  const modeSettings = getUserModeSettings(userId, Mode[mode]);

  let min = THRESHOLD;
  for (let i = modeSettings.n1[0]; i <= modeSettings.n1[1]; i++) {
    for (let j = modeSettings.n2[0]; j <= modeSettings.n2[1]; j++) {
      min = Math.min(min, getQuestionResponseData(userId, formatters[mode](i, j)).length);
    }
  }

  return (
    <div className="panel">
      <div className={`${getBg(Mode[mode])} p-5 text-4xl text-gray-500 lg:text-5xl`}>
        <FontAwesomeIcon icon={getIcon(Mode[mode])}/>
      </div>
      <div className="flex flex-col items-center gap-px">
        <div className={`${getBg(Mode[mode])} p-5 w-full`}>
          <Link className={`${getBtn(Mode[mode])} btn btn-xl`} to={`${userBaseUrl}/game/${mode}/random/all`}><FontAwesomeIcon icon={faDice}/><span>All</span></Link>
        </div>
        <div className={`${getBg(Mode[mode])} flex items-center justify-center gap-5 p-4 w-full`}>
          <div className="flex flex-col items-center justify-center gap-2">
            <Link className={`${getBtn(Mode[mode])} btn btn-sm`} to={`${userBaseUrl}/game/${mode}/random/10`}><FontAwesomeIcon icon={faDice}/><span>10</span></Link>
            <Link className={`${getBtn(Mode[mode])} btn btn-sm`} to={`${userBaseUrl}/game/${mode}/random/25`}><FontAwesomeIcon icon={faDice}/><span>25</span></Link>
            <Link className={`${getBtn(Mode[mode])} btn btn-sm`} to={`${userBaseUrl}/game/${mode}/random/50`}><FontAwesomeIcon icon={faDice}/><span>50</span></Link>
          </div>
          <div className={`flex flex-col items-center justify-center gap-2${min < THRESHOLD ? ' hidden' : ''}`}>
            <Link className={`${getBtn(Mode[mode])} btn btn-sm`} to={`${userBaseUrl}/game/${mode}/targeted/5`}><FontAwesomeIcon icon={faBullseye}/><span>5</span></Link>
            <Link className={`${getBtn(Mode[mode])} btn btn-sm`} to={`${userBaseUrl}/game/${mode}/targeted/10`}><FontAwesomeIcon icon={faBullseye}/><span>10</span></Link>
            <Link className={`${getBtn(Mode[mode])} btn btn-sm`} to={`${userBaseUrl}/game/${mode}/targeted/25`}><FontAwesomeIcon icon={faBullseye}/><span>25</span></Link>
          </div>
        </div>
        <div className={`${getBg(Mode[mode])} p-4 w-full`}>
          <Link className={`${getBtn(Mode[mode])} btn btn-lg`} to={`${userBaseUrl}/report/${mode}`}><FontAwesomeIcon icon={faChartLine}/><span>Report</span></Link>
        </div>
      </div>
    </div>
  );
}

export default ModeLinks;
