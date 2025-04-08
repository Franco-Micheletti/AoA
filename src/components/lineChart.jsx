'use client'
import React from 'react'
import { Line } from 'react-chartjs-2'

export const LineChart = ({ chartData }) => {
  return (
    <div className='flex line-chart p-2 h-60'>
      <Line
        data={chartData}
        options={{
          plugins: {
            tooltip: {
              yAlign: true
            }
          },
          maintainAspectRatio: false,
          parsing: {
            xAxisKey: 'time',
            yAxisKey: 'value'
          },
          responsive: true
        }}
      />
    </div>
  )
}
