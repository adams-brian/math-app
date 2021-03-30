import React from 'react'
import { Line } from 'react-chartjs-2';
import { useParams } from "react-router-dom";
import './ItemDetails.css';
import { ResponseData } from './report';

const LineChart = () => {
  const { userId, question } = useParams<{ userId: string, question: string }>();
  const d: ResponseData[] = JSON.parse(localStorage.getItem(`${userId} ${question}`) || '[]');
  d.reverse();

  const data = {
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
        data: d.map(r => r.i),
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
    },
  }

  return (
    <div>
      <div className='header'>
        <h1 className='title'>{question}</h1>
      </div>
      <Line data={data} options={options} />
    </div>
  );
}

export default LineChart
