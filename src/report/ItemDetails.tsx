import React, { useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import './ItemDetails.css';
import { ResponseData } from './report';
import { ReportBaseUrl } from '.';

const LineChart = () => {
  const { userId, question, mode } = useParams<{ userId: string, question: string, mode: string }>();
  const baseUrl = useContext(ReportBaseUrl);
  const history = useHistory();

  const data: ResponseData[] = JSON.parse(localStorage.getItem(`${userId} ${question}`) || '[]');
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

  return (
    <div className="item-details-main" onClick={() => history.replace(`${baseUrl}/${mode}`)}>
      <div className="item-details-header">{question}</div>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default LineChart
