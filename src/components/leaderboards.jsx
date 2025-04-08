import { leaderboardLongName, getPlayerStatsColumnNames } from '@/utilities/utilities'
export const Leaderboards = ({ tableData }) => {
  return (
    <table className='text-gray-900'>
      <thead>
        <tr>
          {
            tableData !== null && tableData.length > 0 &&
            Object.keys(tableData[0]).map((property, index) => {
              return (
                <td scope='col' tabIndex={index} key={index}>
                  {getPlayerStatsColumnNames[property]}
                </td >
              )
            })
          }
        </tr >
      </thead >
      <tbody>
        {
          tableData !== null && tableData.length > 0 &&
          tableData.map((leaderboard, index) => {
            return (
              <tr tabIndex={index} key={index} className='justify-center odd:bg-gray-100 even:bg-white'>
                <td tabIndex={index + 1} className='text-start'>{leaderboardLongName[leaderboard.leaderboard_id]}</td>
                <td tabIndex={index + 2} className='font-semibold text-sm'>{leaderboard.wins}</td>
                <td tabIndex={index + 3} className='font-semibold text-sm'>{leaderboard.losses}</td>
                <td tabIndex={index + 4} className='font-semibold text-sm'>{leaderboard.streak}</td>
                <td tabIndex={index + 5} className='font-semibold text-sm'>{leaderboard.drops}</td>
                <td tabIndex={index + 6} className='font-semibold text-sm'>{leaderboard.rating}</td>
                <td tabIndex={index + 7} className='font-semibold text-sm'>{leaderboard.highestrating}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table >
  )
}
