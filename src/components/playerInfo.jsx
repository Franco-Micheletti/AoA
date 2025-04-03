import Image from 'next/image'
import { leaderboardLongName, getPlayerStatsColumnNames } from '@/utilities/utilities'
import { RatingHistoryChart } from './ratingHistoryChart'
import { queryRatingHistory } from '../../prisma/client/queryRatingHistory'
const getPlayerAvatar = async (playerInfo) => {
  const res = await fetch(`${process.env.PLAYER_AVATAR}?key=${process.env.API_KEY}&steamids=${playerInfo.steam_id}`)
  const json = await res.json()
  return json
}

export default async function PlayerInfo ({ playerInfo }) {
  const leaderboards = playerInfo.playerLeaderboardStats
  const tableData = leaderboards.map((leaderboard) => {
    delete leaderboard.id
    delete leaderboard.player_id
    delete leaderboard.statgroup_id
    delete leaderboard.disputes
    delete leaderboard.rank
    delete leaderboard.ranktotal
    delete leaderboard.ranklevel
    delete leaderboard.drops
    delete leaderboard.regionrank
    delete leaderboard.regionranktotal
    delete leaderboard.highestrank
    delete leaderboard.highestranklevel
    delete leaderboard.lastmatchdate
    return leaderboard
  })
  const steamStats = await getPlayerAvatar(playerInfo)
  const ratingHistoryRMSolo = await queryRatingHistory(playerInfo, 'rmSolo')
  const ratingHistoryRMTeam = await queryRatingHistory(playerInfo, 'rmTeam')
  const ratingHistoryDatasets = {
    ratingHistoryRMSolo,
    ratingHistoryRMTeam
  }
  return (
    <div className="bg-zinc-50 mt-24 flex flex-col justify-center items-center p-2 rounded-md playerInfo">
      {/* Player Avatar */}
      <div className='flex p-4 gap-5 items-center justify-center h-48 bg-slate-600 w-full rounded-md'>
        {/* Flag Image */}
        <div className='flex flex-col justify-center items-center gap-3 mt-2 mb-2'>
          {
            steamStats !== null && steamStats !== undefined && steamStats.response.players.length > 0 &&
            <Image className='rounded-full' alt={'avatar'} width={75} height={75} src={steamStats.response.players[0].avatarfull}></Image>
          }
          <div className='text-md text-white'>{playerInfo.alias}</div>
          <Image alt={'flag'} width={40} height={40} src={`/images/flags_icons/${playerInfo.country_code.toUpperCase()}.png`}></Image>
        </div>
      </div>
      <div className='flex flex-wrap gap-5 justify-center w-full'>
        {/* Player Stats Table */}
        <div className='mt-2 bg-zinc-50 rounded-md player-stats-table p-2'>
          <div className='flex text-xs rounded-md'>
            {
              leaderboards !== null && leaderboards.length > 0 &&

              Object.keys(tableData[0]).map((property, index) => {
                return (
                  <div key={index} className='flex flex-col bg-zinc-50 gap-0.5'>
                    {/* Column Name */}
                    <div className='flex font-bold h-16 p-2 bg-slate-200 justify-center items-center text-center'>
                      <div>{getPlayerStatsColumnNames[property]}</div>
                    </div>
                    {/* Column Field */}
                    {tableData.map((leaderboard, index) => {
                      return (
                        property === 'leaderboard_id'
                          ? <div className='bg-zinc-100 flex p-2 justify-center items-center h-16' key={index}>{leaderboardLongName[leaderboard[property]]}</div>
                          : <div className='bg-zinc-100 flex p-2 justify-center items-center h-16' key={index}>{leaderboard[property]}</div>
                      )
                    })
                    }
                  </div>
                )
              })
            }
          </div>
        </div>
        {/* Rating History */}
        <RatingHistoryChart ratingHistory={ratingHistoryDatasets} />
      </div>
    </div>
  )
}
