import React from "react";
import { useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useQueueContext } from "../../context/QueueContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Filler
);


export const options = {
  plugins: {
    legend: false,
  },
  scales: {
    x: {
      grid: {
        display: true,
      },
    },

    y: {
      min: 10,
      max: 100,
    },
  },
};

const labels = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресенье",
];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: "Обслужено",
      data: [50, 60, 40, 35, 65, 20, 80],
      borderColor: "rgba(54, 175, 235, 1)",
      backgroundColor: "rgba(57, 147, 195, 0.2)",
      pointBorderColor: "rgba(130, 106, 249, 1)",
      pointBorderWidth: 2,
      pointRadius: 5,
      pointBackgroundColor: "rgba(255, 255, 255, 1)",
    },
  ],
};

export function LineChart({ options, data }: { options: any; data: any }) {
  const { allQueues, getAllQueues } = useQueueContext();

  useEffect(() => {
    getAllQueues(); 
  }, []);

  const statData = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Обслужено",
        data: [allQueues?.length],
        borderColor: "rgba(54, 175, 235, 1)",
        backgroundColor: "rgba(57, 147, 195, 0.2)",
        pointBorderColor: "rgba(130, 106, 249, 1)",
        pointBorderWidth: 2,
        pointRadius: 5,
        pointBackgroundColor: "rgba(255, 255, 255, 1)",
      }
    ]
  }

  console.log(allQueues)
  return <Line options={options} data={statData} />;
}
