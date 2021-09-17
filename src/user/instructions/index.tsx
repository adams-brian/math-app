import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTimes, faDivide, faBullseye, faDice, faChartLine, faUserCog } from '@fortawesome/free-solid-svg-icons'
import { UserBaseUrlContext } from '../';
import './index.css';

const Instructions = () => {
  const userBaseUrl = useContext(UserBaseUrlContext);

  return (
    <div className="instructions">
      <div className="instructions__header">
        <span className="instructions__title">Instructions</span>
      </div>
      <section className="instructions__section instructions__topic-break">
        <div>This app makes it easy to practice</div>
        <div className="instructions__button-set">
          <div className="instructions__discipline background--addition"><FontAwesomeIcon icon={faPlus}/><span>Addition</span></div>
          <div className="instructions__discipline background--subtraction"><FontAwesomeIcon icon={faMinus}/><span>Subtraction</span></div>
          <div className="instructions__discipline background--multiplication"><FontAwesomeIcon icon={faTimes}/><span>Multiplication</span></div>
          <div className="instructions__discipline background--division"><FontAwesomeIcon icon={faDivide}/><span>Division</span></div>
        </div>
      </section>
      <section className="instructions__section instructions__topic-break">
        <div className="instructions__section-header"><FontAwesomeIcon icon={faDice}/> Random</div>
      </section>
      <section className="instructions__section">
        <div>Select to practice all questions in a random order</div>
        <div className="instructions__button-set">
          <div className="instructions__discipline background--addition"><FontAwesomeIcon icon={faDice}/><span>All</span></div>
          <div className="instructions__discipline background--subtraction"><FontAwesomeIcon icon={faDice}/><span>All</span></div>
          <div className="instructions__discipline background--multiplication"><FontAwesomeIcon icon={faDice}/><span>All</span></div>
          <div className="instructions__discipline background--division"><FontAwesomeIcon icon={faDice}/><span>All</span></div>
        </div>
      </section>
      <section className="instructions__section">
        <div>Select to practice randomly selected sets of questions</div>
        <div className="instructions__button-set">
          <div className="instructions__button-inner-set">
            <div className="instructions__discipline background--addition"><FontAwesomeIcon icon={faDice}/><span>10</span></div>
            <div className="instructions__discipline background--addition"><FontAwesomeIcon icon={faDice}/><span>25</span></div>
            <div className="instructions__discipline background--addition"><FontAwesomeIcon icon={faDice}/><span>50</span></div>
          </div>
          <div className="instructions__button-inner-set">
            <div className="instructions__discipline background--subtraction"><FontAwesomeIcon icon={faDice}/><span>10</span></div>
            <div className="instructions__discipline background--subtraction"><FontAwesomeIcon icon={faDice}/><span>25</span></div>
            <div className="instructions__discipline background--subtraction"><FontAwesomeIcon icon={faDice}/><span>50</span></div>
          </div>
          <div className="instructions__button-inner-set">
            <div className="instructions__discipline background--multiplication"><FontAwesomeIcon icon={faDice}/><span>10</span></div>
            <div className="instructions__discipline background--multiplication"><FontAwesomeIcon icon={faDice}/><span>25</span></div>
            <div className="instructions__discipline background--multiplication"><FontAwesomeIcon icon={faDice}/><span>50</span></div>
          </div>
          <div className="instructions__button-inner-set">
            <div className="instructions__discipline background--division"><FontAwesomeIcon icon={faDice}/><span>10</span></div>
            <div className="instructions__discipline background--division"><FontAwesomeIcon icon={faDice}/><span>25</span></div>
            <div className="instructions__discipline background--division"><FontAwesomeIcon icon={faDice}/><span>50</span></div>
          </div>
        </div>
      </section>
      <section className="instructions__section instructions__topic-break">
        <div className="instructions__section-header"><FontAwesomeIcon icon={faBullseye}/> Targeted</div>
      </section>
      <section className="instructions__section">
        <div>Select to practice questions recently answered incorrectly and/or with the longest response time</div>
        <div className="instructions__button-set">
          <div className="instructions__button-inner-set">
            <div className="instructions__discipline background--addition"><FontAwesomeIcon icon={faBullseye}/><span>5</span></div>
            <div className="instructions__discipline background--addition"><FontAwesomeIcon icon={faBullseye}/><span>10</span></div>
            <div className="instructions__discipline background--addition"><FontAwesomeIcon icon={faBullseye}/><span>25</span></div>
          </div>
          <div className="instructions__button-inner-set">
            <div className="instructions__discipline background--subtraction"><FontAwesomeIcon icon={faBullseye}/><span>5</span></div>
            <div className="instructions__discipline background--subtraction"><FontAwesomeIcon icon={faBullseye}/><span>10</span></div>
            <div className="instructions__discipline background--subtraction"><FontAwesomeIcon icon={faBullseye}/><span>25</span></div>
          </div>
          <div className="instructions__button-inner-set">
            <div className="instructions__discipline background--multiplication"><FontAwesomeIcon icon={faBullseye}/><span>5</span></div>
            <div className="instructions__discipline background--multiplication"><FontAwesomeIcon icon={faBullseye}/><span>10</span></div>
            <div className="instructions__discipline background--multiplication"><FontAwesomeIcon icon={faBullseye}/><span>25</span></div>
          </div>
          <div className="instructions__button-inner-set">
            <div className="instructions__discipline background--division"><FontAwesomeIcon icon={faBullseye}/><span>5</span></div>
            <div className="instructions__discipline background--division"><FontAwesomeIcon icon={faBullseye}/><span>10</span></div>
            <div className="instructions__discipline background--division"><FontAwesomeIcon icon={faBullseye}/><span>25</span></div>
          </div>
        </div>
        <div>Available once all questions have been answered at least once</div>
      </section>
      <section className="instructions__section instructions__topic-break">
        <div className="instructions__section-header"><FontAwesomeIcon icon={faChartLine}/> Report</div>
      </section>
      <section className="instructions__section">
        <div><span className="instructions__report instructions__green">Green</span> questions are the fastest and most accurate</div>
        <div><span className="instructions__report instructions__red">Red</span> questions are the slowest and/or most innacurate</div>
      </section>
      <section className="instructions__section">
        <div>Select any question to see a <span className="instructions__report"><FontAwesomeIcon icon={faChartLine}/></span> chart showing accuracy and response times</div>
      </section>
      <section className="instructions__section">
        <div><span className="instructions__report">Top 10</span></div>
        <div>10 fastest and most accurate questions</div>
      </section>
      <section className="instructions__section">
        <div><span className="instructions__report">Bottom 10</span></div>
        <div>10 slowest and/or most innacurate questions</div>
      </section>
      <section className="instructions__section instructions__topic-break">
        <div className="instructions__section-header"><FontAwesomeIcon icon={faUserCog}/> Settings</div>
      </section>
      <section className="instructions__section">
        <div>Adjust the range of questions to practice</div>
      </section>
      <section className="instructions__section">
        <Link className="link-button link-button--medium link-button--app" to={`${userBaseUrl}/home`}><span>Got it!</span></Link>
      </section>
    </div>
  );
};

export default Instructions;
