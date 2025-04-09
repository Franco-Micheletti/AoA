import { leaderboardLongName, getPlayerStatsColumnNames } from '@/utilities/utilities'
export const Leaderboards = ({ tableData }) => {
  return (
    <div className='flex justify-center'>
      <div className='overflow-x-auto'>
        <table className='border-0 p-3'>
          <thead>
            <tr className='bg-gray-200'>
              {
                tableData !== null && tableData.length > 0 &&
                Object.keys(tableData[0]).map((property, index) => {
                  return (
                    <td scope='col' tabIndex={index} key={index} className='leaderboard-column'>
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
                  <tr tabIndex={index} key={index} className='odd:bg-gray-100 even:bg-white'>
                    <td tabIndex={index + 1} className='leaderboard-name'>{leaderboardLongName[leaderboard.leaderboard_id]}</td>
                    <td tabIndex={index + 2} className='leaderboard-data-value'>{leaderboard.wins}</td>
                    <td tabIndex={index + 3} className='leaderboard-data-value'>{leaderboard.losses}</td>
                    <td tabIndex={index + 4} className='leaderboard-data-value'>{leaderboard.streak}</td>
                    <td tabIndex={index + 5} className='leaderboard-data-value'>{leaderboard.drops}</td>
                    <td tabIndex={index + 6} className='leaderboard-data-value'>{leaderboard.rating}</td>
                    <td tabIndex={index + 7} className='leaderboard-data-value'>{leaderboard.highestrating}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table >
      </div>
    </div>
  )
}
