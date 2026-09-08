// Distress Trend Chart component
// Line chart showing distress score over time

'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { DistressHistory } from '@/types';
import { formatDate } from '@/utils/formatting';

interface DistressTrendChartProps {
  data: DistressHistory[];
  height?: number;
}

export function DistressTrendChart({ data, height = 300 }: DistressTrendChartProps) {
  // Transform data for the chart
  const chartData = data.map(item => ({
    date: formatDate(item.date),
    score: item.distressScore,
    risk: item.riskLevel,
  }));
  
  // Custom tooltip component for showing details when hovering over chart
  // TypeScript: Define proper types instead of 'any' to avoid deployment errors
  // 'active' - boolean telling if tooltip should show
  // 'payload' - array containing the data for the point being hovered
  const CustomTooltip = ({ 
    active, 
    payload 
  }: { 
    active?: boolean; 
    payload?: Array<{ 
      payload: { date: string; score: number; risk: string }; 
      value: number 
    }> 
  }) => {
    // Only display tooltip if it's active and has data
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded shadow-lg">
          {/* Show the date */}
          <p className="text-sm font-medium text-gray-900 mb-1">
            {payload[0].payload.date}
          </p>
          {/* Show the distress score */}
          <p className="text-sm text-gray-700">
            Distress Score: <span className="font-semibold">{payload[0].value}</span>
          </p>
          {/* Show the risk level */}
          <p className="text-xs text-gray-600 mt-1">
            Risk: {payload[0].payload.risk}
          </p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: '#6b7280' }}
            stroke="#9ca3af"
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 12, fill: '#6b7280' }}
            stroke="#9ca3af"
            label={{ value: 'Distress Score', angle: -90, position: 'insideLeft', style: { fontSize: 12, fill: '#6b7280' } }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: 14 }}
            iconType="line"
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#2563eb"
            strokeWidth={3}
            dot={{ fill: '#2563eb', r: 4 }}
            activeDot={{ r: 6 }}
            name="Distress Score"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
