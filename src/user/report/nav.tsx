import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTimes, faDivide, faHome } from '@fortawesome/free-solid-svg-icons'
import { UserBaseUrlContext } from '..';
import { Mode } from '../../modes';
import './nav.css';

const Nav = () => {
  const { mode } = useParams<{ mode: keyof typeof Mode }>();
  const userBaseUrl = useContext(UserBaseUrlContext);

  return (
    <div className="report-tabs">
      <Link className={`link-button system-button report-home`} to={`${userBaseUrl}/home`}><FontAwesomeIcon icon={faHome}/></Link>
      <Link className={`link-button report-tab background-addition report-tab-${mode === Mode.addition ? 'active' : 'inactive'}`} to={`${userBaseUrl}/report/addition`} replace><FontAwesomeIcon icon={faPlus}/></Link>
      <Link className={`link-button report-tab background-subtraction report-tab-${mode === Mode.subtraction ? 'active' : 'inactive'}`} to={`${userBaseUrl}/report/subtraction`} replace><FontAwesomeIcon icon={faMinus}/></Link>
      <Link className={`link-button report-tab background-multiplication report-tab-${mode === Mode.multiplication ? 'active' : 'inactive'}`} to={`${userBaseUrl}/report/multiplication`} replace><FontAwesomeIcon icon={faTimes}/></Link>
      <Link className={`link-button report-tab background-division report-tab-${mode === Mode.division ? 'active' : 'inactive'}`} to={`${userBaseUrl}/report/division`} replace><FontAwesomeIcon icon={faDivide}/></Link>
    </div>
  );
}

export default Nav;