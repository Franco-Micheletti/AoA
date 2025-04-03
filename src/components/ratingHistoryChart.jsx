'use client'
import { useState } from 'react'
// import { ratingHistoryData } from '@/utilities/utilities'
import { LineChart } from './lineChart'
import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js'
import { getDateList } from '@/utilities/utilities'
export const RatingHistoryChart = ({ ratingHistory }) => {
  Chart.register(CategoryScale)
  // Dates
  const timestampsRMSolo = getDateList(ratingHistory.ratingHistoryRMSolo)
  const timestampsRMTeam = getDateList(ratingHistory.ratingHistoryRMTeam)
  // Ratings
  const ratingsRMSolo = ratingHistory.ratingHistoryRMSolo.map((data) => data.new_rating)
  const ratingsRMTeam = ratingHistory.ratingHistoryRMTeam.map((data) => data.new_rating)
  const [chartData, setChartData] = useState({
    labels: timestampsRMSolo,
    datasets: [
      {
        label: 'RM 1v1',
        data: ratingsRMSolo,
        backgroundColor: ['cyan'],
        borderColor: 'cyan',
        borderWidth: 1
      },
      {
        label: 'RM Team',
        data: ratingsRMTeam,
        backgroundColor: ['violet'],
        borderColor: 'violet',
        borderWidth: 1
      }
    ]
  })
  return (
    <LineChart chartData={chartData} />
  )
}
