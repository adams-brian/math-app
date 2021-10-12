import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTimes, faDivide, faBullseye, faDice, faChartLine, faUserCog } from '@fortawesome/free-solid-svg-icons'
import { UserBaseUrlContext } from '../';

const Instructions = () => {
  const userBaseUrl = useContext(UserBaseUrlContext);

  return (
    <div className="leading-tight max-w-4xl panel text-xl">
      <div className="bg-gray-200 p-5 text-4xl lg:text-5xl">Instructions</div>
      <section className="bg-gray-200 flex flex-col gap-5 p-5">
        <div>This app makes it easy to practice</div>
        <div className="flex flex-wrap gap-2 items-center justify-center">
          <div className="bg-addition-400 btn btn-md"><FontAwesomeIcon icon={faPlus}/><span>Addition</span></div>
          <div className="bg-subtraction-400 btn btn-md"><FontAwesomeIcon icon={faMinus}/><span>Subtraction</span></div>
          <div className="bg-multiplication-400 btn btn-md"><FontAwesomeIcon icon={faTimes}/><span>Multiplication</span></div>
          <div className="bg-division-400 btn btn-md"><FontAwesomeIcon icon={faDivide}/><span>Division</span></div>
        </div>
      </section>
      <section className="flex flex-col gap-px">
        <div className="bg-gray-200 p-5 text-3xl"><FontAwesomeIcon icon={faDice}/> Random</div>
        <section className="bg-gray-200 flex flex-col gap-5 p-5">
          <div>Select to practice all questions in a random order</div>
          <div className="flex flex-wrap gap-2 items-center justify-center">
            <div className="bg-addition-400 btn btn-md"><FontAwesomeIcon icon={faDice}/><span>All</span></div>
            <div className="bg-subtraction-400 btn btn-md"><FontAwesomeIcon icon={faDice}/><span>All</span></div>
            <div className="bg-multiplication-400 btn btn-md"><FontAwesomeIcon icon={faDice}/><span>All</span></div>
            <div className="bg-division-400 btn btn-md"><FontAwesomeIcon icon={faDice}/><span>All</span></div>
          </div>
        </section>
        <section className="bg-gray-200 flex flex-col gap-5 p-5">
          <div>Select to practice randomly selected sets of questions</div>
          <div className="flex flex-wrap gap-5 items-center justify-center">
            <div className="flex flex-col gap-2 items-center justify-center">
              <div className="bg-addition-400 btn btn-md"><FontAwesomeIcon icon={faDice}/><span>10</span></div>
              <div className="bg-addition-400 btn btn-md"><FontAwesomeIcon icon={faDice}/><span>25</span></div>
              <div className="bg-addition-400 btn btn-md"><FontAwesomeIcon icon={faDice}/><span>50</span></div>
            </div>
            <div className="flex flex-col gap-2 items-center justify-center">
              <div className="bg-subtraction-400 btn btn-md"><FontAwesomeIcon icon={faDice}/><span>10</span></div>
              <div className="bg-subtraction-400 btn btn-md"><FontAwesomeIcon icon={faDice}/><span>25</span></div>
              <div className="bg-subtraction-400 btn btn-md"><FontAwesomeIcon icon={faDice}/><span>50</span></div>
            </div>
            <div className="flex flex-col gap-2 items-center justify-center">
              <div className="bg-multiplication-400 btn btn-md"><FontAwesomeIcon icon={faDice}/><span>10</span></div>
              <div className="bg-multiplication-400 btn btn-md"><FontAwesomeIcon icon={faDice}/><span>25</span></div>
              <div className="bg-multiplication-400 btn btn-md"><FontAwesomeIcon icon={faDice}/><span>50</span></div>
            </div>
            <div className="flex flex-col gap-2 items-center justify-center">
              <div className="bg-division-400 btn btn-md"><FontAwesomeIcon icon={faDice}/><span>10</span></div>
              <div className="bg-division-400 btn btn-md"><FontAwesomeIcon icon={faDice}/><span>25</span></div>
              <div className="bg-division-400 btn btn-md"><FontAwesomeIcon icon={faDice}/><span>50</span></div>
            </div>
          </div>
        </section>
      </section>
      <section className="flex flex-col gap-px">
        <div className="bg-gray-200 p-5 text-3xl"><FontAwesomeIcon icon={faBullseye}/> Targeted</div>
        <section className="bg-gray-200 flex flex-col gap-5 p-5">
          <div>Select to practice questions recently answered incorrectly and/or with the longest response time</div>
          <div className="flex flex-wrap gap-5 items-center justify-center">
            <div className="flex flex-col gap-2 items-center justify-center">
              <div className="bg-addition-400 btn btn-md"><FontAwesomeIcon icon={faBullseye}/><span>5</span></div>
              <div className="bg-addition-400 btn btn-md"><FontAwesomeIcon icon={faBullseye}/><span>10</span></div>
              <div className="bg-addition-400 btn btn-md"><FontAwesomeIcon icon={faBullseye}/><span>25</span></div>
            </div>
            <div className="flex flex-col gap-2 items-center justify-center">
              <div className="bg-subtraction-400 btn btn-md"><FontAwesomeIcon icon={faBullseye}/><span>5</span></div>
              <div className="bg-subtraction-400 btn btn-md"><FontAwesomeIcon icon={faBullseye}/><span>10</span></div>
              <div className="bg-subtraction-400 btn btn-md"><FontAwesomeIcon icon={faBullseye}/><span>25</span></div>
            </div>
            <div className="flex flex-col gap-2 items-center justify-center">
              <div className="bg-multiplication-400 btn btn-md"><FontAwesomeIcon icon={faBullseye}/><span>5</span></div>
              <div className="bg-multiplication-400 btn btn-md"><FontAwesomeIcon icon={faBullseye}/><span>10</span></div>
              <div className="bg-multiplication-400 btn btn-md"><FontAwesomeIcon icon={faBullseye}/><span>25</span></div>
            </div>
            <div className="flex flex-col gap-2 items-center justify-center">
              <div className="bg-division-400 btn btn-md"><FontAwesomeIcon icon={faBullseye}/><span>5</span></div>
              <div className="bg-division-400 btn btn-md"><FontAwesomeIcon icon={faBullseye}/><span>10</span></div>
              <div className="bg-division-400 btn btn-md"><FontAwesomeIcon icon={faBullseye}/><span>25</span></div>
            </div>
          </div>
          <div>Available once all questions have been answered at least once</div>
        </section>
      </section>
      <section className="flex flex-col gap-px">
        <div className="bg-gray-200 p-5 text-3xl"><FontAwesomeIcon icon={faChartLine}/> Report</div>
        <section className="bg-gray-200 flex flex-col gap-5 p-5">
          <div><span className="bg-correct btn btn-md">Green</span> questions are the fastest and most accurate</div>
          <div><span className="bg-incorrect btn btn-md">Red</span> questions are the slowest and/or most innacurate</div>
        </section>
        <section className="bg-gray-200 flex flex-col gap-5 p-5">
          <div>Select any question to see a <span className="btn btn-md-fw"><FontAwesomeIcon icon={faChartLine}/></span> chart showing accuracy and response times</div>
        </section>
        <section className="bg-gray-200 flex flex-col gap-5 p-5">
          <div><span className="btn btn-md">Top 10</span></div>
          <div>10 fastest and most accurate questions</div>
        </section>
        <section className="bg-gray-200 flex flex-col gap-5 p-5">
          <div><span className="btn btn-md">Bottom 10</span></div>
          <div>10 slowest and/or most innacurate questions</div>
        </section>
      </section>
      <section className="flex flex-col gap-px">
        <div className="bg-gray-200 p-5 text-3xl"><FontAwesomeIcon icon={faUserCog}/> Settings</div>
        <div className="bg-gray-200 p-5">Select between multiple choice and short answer</div>
        <div className="bg-gray-200 p-5">Adjust the range of questions to practice</div>
      </section>
      <section>
        <div className="bg-gray-200 flex flex-col items-center p-5">
          <Link className="btn btn-app btn-lg" to={`${userBaseUrl}/home`}><span>Got it!</span></Link>
        </div>
      </section>
    </div>
  );
};

export default Instructions;
