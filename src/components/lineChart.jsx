'use client'
import React from 'react'
import { Line } from 'react-chartjs-2'

export const LineChart = ({ chartData }) => {
  return (
    <div className='flex line-chart'>
      <Line
        data={chartData}
        options={{
          plugins: {
            tooltip: {
              yAlign: true
            }
          },
          maintainAspectRatio: false,
          responsive: true
          // tooltips: {
          //   callbacks: {
          //     label: function (tooltipItem, data) {
          //       const dataset = data.datasets[tooltipItem.datasetIndex]
          //       const index = tooltipItem.index
          //       return dataset.labels[index] + ': ' + dataset.data[index]
          //     }
          //   }
          // }
        }}
      />
    </div>
  )
}
