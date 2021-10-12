import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faLongArrowAltDown, faLongArrowAltRight, faPlus, faMinus, faTimes, faDivide } from '@fortawesome/free-solid-svg-icons'
import { faSquare, faCheckSquare } from '@fortawesome/free-regular-svg-icons';
import { DataStoreContext, defaultSettings } from '../../dataStore';
import { UserBaseUrlContext } from '../';
import Range from './range';
import { Mode, formatters } from '../../modes';

const Settings = () => {
  const { userId } = useParams<{ userId: string }>();
  const { getUserName, getUserSettings, setUserSettings } = useContext(DataStoreContext);
  const userName = getUserName(userId);
  const userBaseUrl = useContext(UserBaseUrlContext);

  const settings = getUserSettings(userId);

  const [am, setam] = useState(settings.a.m || 0);
  const [an1, setan1] = useState(settings.a.n1);
  const [an2, setan2] = useState(settings.a.n2);
  const [sm, setsm] = useState(settings.s.m || 0);
  const [sn1, setsn1] = useState(settings.s.n1);
  const [sn2, setsn2] = useState(settings.s.n2);
  const [mm, setmm] = useState(settings.m.m || 0);
  const [mn1, setmn1] = useState(settings.m.n1);
  const [mn2, setmn2] = useState(settings.m.n2);
  const [dm, setdm] = useState(settings.d.m || 0);
  const [dn1, setdn1] = useState(settings.d.n1);
  const [dn2, setdn2] = useState(settings.d.n2);

  const paRef = useRef(settings.pa);
  
  useEffect(() => {
    setUserSettings(userId, {
      a: { m: am, n1: an1, n2: an2 },
      s: { m: sm, n1: sn1, n2: sn2 },
      m: { m: mm, n1: mn1, n2: mn2 },
      d: { m: dm, n1: dn1, n2: dn2 },
      pa: paRef.current
    })
  }, [am, an1, an2, sm, sn1, sn2, mm, mn1, mn2, dm, dn1, dn2, userId, setUserSettings])

  return (
    <div className="flex flex-col gap-4 items-center max-w-screen-sm relative w-full md:gap-8">
      <div className="grid grid-cols-auto-1fr items-start justify-center w-full">
        <Link className={`btn btn-sm-fw btn-app col-start-1 row-start-1 md:btn-md-fw`} to={`${userBaseUrl}/home`}><FontAwesomeIcon icon={faHome}/></Link>
        <span className="col-start-1 col-end-3 mx-11 row-start-1 text-center text-3xl md:mx-16">Settings for {userName}</span>
      </div>
      <div className="panel w-full">
        <div className="bg-addition-100 p-3 text-4xl text-gray-500 md:p-6 md:text-5xl">
          <FontAwesomeIcon icon={faPlus}/>
        </div>
        <div className="bg-addition-100 flex flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="panel w-full">
            <div className="bg-addition-100 p-3 text-2xl md:text-3xl">Response Type</div>
            <div className="bg-addition-100">
              <div className="inline-flex flex-col gap-2 items-start mx-auto p-3 text-xl md:text-2xl">
                <div className="flex gap-2 items-center justify-start" onClick={() => setam(0)}>
                  <FontAwesomeIcon icon={am === 0 ? faCheckSquare : faSquare } />
                  <span>Short Answer</span>
                </div>
                <div className="flex gap-2 items-center justify-start" onClick={() => setam(1)}>
                  <FontAwesomeIcon icon={am === 1 ? faCheckSquare : faSquare } />
                  <span>Multiple Choice</span>
                </div>
              </div>
            </div>
          </div>
          <div className="panel w-full">
            <div className="bg-addition-100 p-3 text-2xl md:text-3xl">Question Range</div>
            <div className="bg-addition-100 flex flex-col gap-2 px-10 py-3">
              <Range range={defaultSettings.a.n1} values={an1} setValues={setan1} />
              <Range range={defaultSettings.a.n2} values={an2} setValues={setan2} />
              <div className="flex flex-col gap-2 items-center justify-center p-3 text-xl md:flex-row md:gap-11 md:text-2xl">
                <div>{ formatters[Mode.addition](an1[0], an2[0]) } = { an1[0] + an2[0] }</div>
                <div className="hidden md:block"><FontAwesomeIcon icon={faLongArrowAltRight} /></div>
                <div className="md:hidden"><FontAwesomeIcon icon={faLongArrowAltDown} /></div>
                <div>{ formatters[Mode.addition](an1[1], an2[1]) } = { an1[1] + an2[1] }</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="panel w-full">
        <div className="bg-subtraction-100 p-3 text-4xl text-gray-500 md:p-6 md:text-5xl">
          <FontAwesomeIcon icon={faMinus}/>
        </div>
        <div className="bg-subtraction-100 flex flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="panel w-full">
            <div className="bg-subtraction-100 p-3 text-2xl md:text-3xl">Response Type</div>
            <div className="bg-subtraction-100">
              <div className="inline-flex flex-col gap-2 items-start mx-auto p-3 text-xl md:text-2xl">
                <div className="flex gap-2 items-center justify-start" onClick={() => setsm(0)}>
                  <FontAwesomeIcon icon={sm === 0 ? faCheckSquare : faSquare } />
                  <span>Short Answer</span>
                </div>
                <div className="flex gap-2 items-center justify-start" onClick={() => setsm(1)}>
                <FontAwesomeIcon icon={sm === 1 ? faCheckSquare : faSquare } />
                  <span>Multiple Choice</span>
                </div>
              </div>
            </div>
          </div>
          <div className="panel w-full">
            <div className="bg-subtraction-100 p-3 text-2xl md:text-3xl">Question Range</div>
            <div className="bg-subtraction-100 flex flex-col gap-2 px-10 py-3">
              <Range range={defaultSettings.s.n1} values={sn1} setValues={setsn1} />
              <Range range={defaultSettings.s.n2} values={sn2} setValues={setsn2} />
              <div className="flex flex-col gap-2 items-center justify-center p-3 text-xl md:flex-row md:gap-11 md:text-2xl">
                <div>{ formatters[Mode.subtraction](sn1[0], sn2[0]) } = { sn2[0] }</div>
                <div className="hidden md:block"><FontAwesomeIcon icon={faLongArrowAltRight} /></div>
                <div className="md:hidden"><FontAwesomeIcon icon={faLongArrowAltDown} /></div>
                <div>{ formatters[Mode.subtraction](sn1[1], sn2[1]) } = { sn2[1] }</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="panel w-full">
        <div className="bg-multiplication-100 p-3 text-4xl text-gray-500 md:p-6 md:text-5xl">
          <FontAwesomeIcon icon={faTimes}/>
        </div>
        <div className="bg-multiplication-100 flex flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="panel w-full">
            <div className="bg-multiplication-100 p-3 text-2xl md:text-3xl">Response Type</div>
            <div className="bg-multiplication-100">
              <div className="inline-flex flex-col gap-2 items-start mx-auto p-3 text-xl md:text-2xl">
                <div className="flex gap-2 items-center justify-start" onClick={() => setmm(0)}>
                  <FontAwesomeIcon icon={mm === 0 ? faCheckSquare : faSquare } />
                  <span>Short Answer</span>
                </div>
                <div className="flex gap-2 items-center justify-start" onClick={() => setmm(1)}>
                <FontAwesomeIcon icon={mm === 1 ? faCheckSquare : faSquare } />
                  <span>Multiple Choice</span>
                </div>
              </div>
            </div>
          </div>
          <div className="panel w-full">
            <div className="bg-multiplication-100 p-3 text-2xl md:text-3xl">Question Range</div>
            <div className="bg-multiplication-100 flex flex-col gap-2 px-10 py-3">
              <Range range={defaultSettings.m.n1} values={mn1} setValues={setmn1} />
              <Range range={defaultSettings.m.n2} values={mn2} setValues={setmn2} />
              <div className="flex flex-col gap-2 items-center justify-center p-3 text-xl md:flex-row md:gap-11 md:text-2xl">
                <div>{ formatters[Mode.multiplication](mn1[0], mn2[0]) } = { mn1[0] * mn2[0] }</div>
                <div className="hidden md:block"><FontAwesomeIcon icon={faLongArrowAltRight} /></div>
                <div className="md:hidden"><FontAwesomeIcon icon={faLongArrowAltDown} /></div>
                <div>{ formatters[Mode.multiplication](mn1[1], mn2[1]) } = { mn1[1] * mn2[1] }</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="panel w-full">
        <div className="bg-division-100 p-3 text-4xl text-gray-500 md:p-6 md:text-5xl">
          <FontAwesomeIcon icon={faDivide}/>
        </div>
        <div className="bg-division-100 flex flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="panel w-full">
            <div className="bg-division-100 p-3 text-2xl md:text-3xl">Response Type</div>
            <div className="bg-division-100">
              <div className="inline-flex flex-col gap-2 items-start mx-auto p-3 text-xl md:text-2xl">
                <div className="flex gap-2 items-center justify-start" onClick={() => setdm(0)}>
                  <FontAwesomeIcon icon={dm === 0 ? faCheckSquare : faSquare } />
                  <span>Short Answer</span>
                </div>
                <div className="flex gap-2 items-center justify-start" onClick={() => setdm(1)}>
                <FontAwesomeIcon icon={dm === 1 ? faCheckSquare : faSquare } />
                  <span>Multiple Choice</span>
                </div>
              </div>
            </div>
          </div>
          <div className="panel w-full">
            <div className="bg-division-100 p-3 text-2xl md:text-3xl">Question Range</div>
            <div className="bg-division-100 flex flex-col gap-2 px-10 py-3">
              <Range range={defaultSettings.d.n1} values={dn1} setValues={setdn1} />
              <Range range={defaultSettings.d.n2} values={dn2} setValues={setdn2} />
              <div className="flex flex-col gap-2 items-center justify-center p-3 text-xl md:flex-row md:gap-11 md:text-2xl">
                <div>{ formatters[Mode.division](dn1[0], dn2[0]) } = { dn2[0] }</div>
                <div className="hidden md:block"><FontAwesomeIcon icon={faLongArrowAltRight} /></div>
                <div className="md:hidden"><FontAwesomeIcon icon={faLongArrowAltDown} /></div>
                <div>{ formatters[Mode.division](dn1[1], dn2[1]) } = { dn2[1] }</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
