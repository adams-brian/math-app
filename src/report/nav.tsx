import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTimes, faDivide } from '@fortawesome/free-solid-svg-icons'
import { ReportBaseUrl } from '.';
import { Mode } from '../modes';

const Nav = () => {
  const { mode } = useParams<{ mode: keyof typeof Mode }>();
  const baseUrl = useContext(ReportBaseUrl);

  return (
    <div className="report-tabs">
      <Link className={`link-button report-tab report-tab-addition report-tab-${mode === Mode.addition ? 'active' : 'inactive'}`} to={`${baseUrl}/addition`} replace><FontAwesomeIcon icon={faPlus}/></Link>
      <Link className={`link-button report-tab report-tab-subtraction report-tab-${mode === Mode.subtraction ? 'active' : 'inactive'}`} to={`${baseUrl}/subtraction`} replace><FontAwesomeIcon icon={faMinus}/></Link>
      <Link className={`link-button report-tab report-tab-multiplication report-tab-${mode === Mode.multiplication ? 'active' : 'inactive'}`} to={`${baseUrl}/multiplication`} replace><FontAwesomeIcon icon={faTimes}/></Link>
      <Link className={`link-button report-tab report-tab-division report-tab-${mode === Mode.division ? 'active' : 'inactive'}`} to={`${baseUrl}/division`} replace><FontAwesomeIcon icon={faDivide}/></Link>
    </div>
  );
}

export default Nav;