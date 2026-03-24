import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

interface PriceData {
  date: string;
  price: number;
}

interface PriceChartProps {
  data: PriceData[];
}

const PriceChart: React.FC<PriceChartProps> = ({ data }) => {
  // Calculate 50-day moving average
  const calculateMovingAverage = (data: PriceData[]) => {
    const movingAverage: PriceData[] = [];
    for (let i = 49; i < data.length; i++) {
      const avg = data.slice(i - 49, i + 1).reduce((sum, current) => sum + current.price, 0) / 50;
      movingAverage.push({ date: data[i].date, price: avg });
    }
    return movingAverage;
  };

  const movingAverageData = calculateMovingAverage(data);

  return (
    <LineChart width={800} height={400} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="price" stroke="#8884d8" name="Price" />
      <Line type="monotone" dataKey="price" stroke="#82ca9d" data={movingAverageData} name="50-Day Moving Average" />
    </LineChart>
  );
};

export default PriceChart;