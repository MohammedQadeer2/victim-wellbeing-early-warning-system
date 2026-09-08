// Risk Distribution Chart component
// Pie chart showing distribution of cases by risk level

'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { RiskDistribution } from '@/types';

interface RiskDistributionChartProps {
  data: RiskDistribution[];
  height?: number;
}

// Colors for each risk level
const COLORS = {
  LOW: '#10b981',
  MODERATE: '#f59e0b',
  HIGH: '#f97316',
  CRITICAL: '#ef4444',
};

export function RiskDistributionChart({ data, height = 300 }: RiskDistributionChartProps) {
  // Transform data for the chart
  const chartData = data.map(item => ({
    name: item.riskLevel,
    value: item.count,
    percentage: item.percentage,
  }));
  
  // Custom tooltip component
  // TypeScript: Define proper types for tooltip props instead of 'any'
  // 'active' tells us if the tooltip is currently showing
  // 'payload' contains the data for the hovered chart section
  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: { name: string; value: number; percentage: number } }> }) => {
    // Only show tooltip if it's active and has data
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded shadow-lg">
          <p className="text-sm font-medium text-gray-900">
            {data.name}
          </p>
          <p className="text-sm text-gray-700">
            Cases: <span className="font-semibold">{data.value}</span>
          </p>
          <p className="text-sm text-gray-700">
            Percentage: <span className="font-semibold">{data.percentage.toFixed(1)}%</span>
          </p>
        </div>
      );
    }
    return null;
  };
  
  // Custom label function to show percentage on pie chart
  // TypeScript: Define proper type for entry parameter
  const renderLabel = (entry: { percentage: number }) => {
    return `${entry.percentage.toFixed(0)}%`;
  };
  
  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[entry.name as keyof typeof COLORS]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            height={36}
            wrapperStyle={{ fontSize: 14 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
