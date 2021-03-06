import React, { FunctionComponent, useRef, useState, createContext } from 'react';
import Reward from 'react-rewards';
import './index.css';

const confettiConfig = {
  lifetime: 360,
  angle: 90,
  decay: 0.97,
  spread: 360,
  startVelocity: 23,
  elementCount: 200,
  elementSize: 14
};

export const ConfettiContext = createContext(() => {});

const ConfettiLauncher: FunctionComponent = (props) => {
  const confettiRef = useRef(null);
  const [ show, setShow ] = useState(false);

  const launchConfetti = () => {
    (confettiRef.current as any).rewardMe();
    setShow(true);
  }

  return (
    <ConfettiContext.Provider value={launchConfetti}>
      { props.children }
      <div className="confetti-launcher">
        <Reward ref={confettiRef} type="confetti" config={confettiConfig}><span></span></Reward>
        <div className="confetti-launcher__message"
          style={{ display: show ? 'block' : 'none'}}
          onAnimationEnd={e => {
            setShow(false);
          }}>Great work!</div>
      </div>
    </ConfettiContext.Provider>
  )
}

export default ConfettiLauncher;
