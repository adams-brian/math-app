import React from 'react'
import { Line } from 'react-chartjs-2';
import './ItemDetails.css';
import { ResponseData } from './report';

interface Props {
  question: string;
  data: ResponseData[];
  onClick: () => void;
}

const LineChart = ({ question, data, onClick }: Props) => {
  const d = [...data];
  d.reverse();

  const chartData = {
    labels: d.map((r, i) => i + 1),
    datasets: [
      {
        label: 'Time',
        data: d.map(r => r.e / 1000),
        fill: false,
        backgroundColor: 'rgb(97, 223, 101)',
        borderColor: 'rgba(97, 223, 101)',
      },
      {
        label: 'Incorrect',
        data: d.map(r => r.i.length),
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
    <div className="item-details-main" onClick={onClick}>
      <div className="item-details-header">{question}</div>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default LineChart
