'use client'
import React from 'react'
import { Line } from 'react-chartjs-2'

export const LineChart = ({ chartData }) => {
  return (
    <div className='p-2 h-96'>
      <Line
        data={chartData}
        options={{
          plugins: {
            tooltip: {
              yAlign: false
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
