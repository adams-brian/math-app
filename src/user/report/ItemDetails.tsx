import React, { useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { useSpring, animated } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { ResponseData, DataStoreContext } from '../../dataStore';
import { UserBaseUrlContext } from '..';
import { Mode, getBg } from '../../modes';

interface Props {
  clickCoords: number[];
}

const LineChart = ({ clickCoords }: Props) => {
  const { userId, question, mode } = useParams<{ userId: string, question: string, mode: keyof typeof Mode }>();
  const userBaseUrl = useContext(UserBaseUrlContext);
  const { getQuestionResponseData } = useContext(DataStoreContext);
  const history = useHistory();

  const data: ResponseData[] = getQuestionResponseData(userId, question);
  data.reverse();

  const chartData = {
    labels: data.map((r, i) => i + 1),
    datasets: [
      {
        label: 'Time',
        data: data.map(r => r.e / 1000),
        fill: false,
        backgroundColor: 'rgb(97, 223, 101)',
        borderColor: 'rgba(97, 223, 101)',
      },
      {
        label: 'Incorrect',
        data: data.map(r => r.i.length),
        fill: false,
        backgroundColor: 'rgb(253, 95, 95)',
        borderColor: 'rgba(253, 95, 95)',
      }
    ],
  }

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    }
  }

  const props = useSpring({
    from: {
      transform: 'translate(-50%, -50%) scale(0)',
      top: ((clickCoords[1] * 100) / window.innerHeight) + 'vh',
      left: ((clickCoords[0] * 100) / window.innerWidth) + 'vw'
    },
    to: {
      transform: 'translate(-50%, -50%) scale(1)',
      top: '50vh',
      left: '50vw'
    }
  });

  return (
    <animated.div
      style={props}
      className={`fixed h-56 panel w-72 md:h-96 md:w-144`} onClick={() => history.replace(`${userBaseUrl}/report/${mode}`)}>
        <div className={`${getBg(Mode[mode])} flex flex-col h-full items-center justify-between p-1.5 md:p-5`}>
          <div className="text-4xl mt-4 md:text-5xl md:mt-1">{question}</div>
          <Line data={chartData} options={options} />
          <div className="absolute btn btn-xs-fw btn-app right-3 top-3 md:btn-sm-fw"><FontAwesomeIcon icon={faTimes}/></div>
        </div>
    </animated.div>
  );
}

export default LineChart
