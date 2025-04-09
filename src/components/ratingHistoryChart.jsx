'use client'
import { useState } from 'react'
// import { ratingHistoryData } from '@/utilities/utilities'
import { LineChart } from './lineChart'
import { getDateList, combineDatesAndRatings } from '@/utilities/utilities'
import Chart from 'chart.js/auto'
import { CategoryScale } from 'chart.js'

export const RatingHistoryChart = ({ ratingHistory }) => {
  Chart.register(CategoryScale)
  // Dates
  const datesRMSolo = getDateList(ratingHistory.ratingHistoryRMSolo)
  const datesRMTeam = getDateList(ratingHistory.ratingHistoryRMTeam)
  // Ratings
  const ratingsRMSolo = ratingHistory.ratingHistoryRMSolo.map((data) => data.new_rating)
  const ratingsRMTeam = ratingHistory.ratingHistoryRMTeam.map((data) => data.new_rating)
  const [combinedSoloData, combinedTeamData] = combineDatesAndRatings(ratingsRMSolo, datesRMSolo, ratingsRMTeam, datesRMTeam)
  const [chartData, setChartData] = useState({
    datasets: [
      {
        label: 'RM 1v1',
        data: combinedSoloData,
        backgroundColor: ['cyan'],
        borderColor: 'cyan',
        borderWidth: 1
      },
      {
        label: 'RM Team',
        data: combinedTeamData,
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
