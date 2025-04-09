import Image from 'next/image'
import { RatingHistoryChart } from './ratingHistoryChart'
import { queryRatingHistory } from '../../prisma/client/queryRatingHistory'
import OutdatedProfile from './outdatedProfile'
import { Leaderboards } from './leaderboards'
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
    <div className="bg-zinc-50 mt-24 flex rounded-md player-info">
      {/* Player Portrait */}
      <div className='flex flex-col gap-5 justify-start bg-gray-100 rounded-md player-portrait'>
        {/* Flag Image */}
        <div className='flex flex-col items-center gap-3 mt-32 mb-2'>
          {
            /* Player Avatar Image */
            steamStats !== null && steamStats !== undefined && steamStats.response.players.length > 0 &&
            <Image className='rounded-full' alt={'avatar'} width={125} height={125} src={steamStats.response.players[0].avatarfull}></Image>
          }
          <div className='text-lg text-black'>{playerInfo.alias}</div>
          <Image alt={'flag'} width={70} height={70} src={`/images/flags_icons/${playerInfo.country_code.toUpperCase()}.png`}></Image>
        </div>
        <OutdatedProfile playerInfo={playerInfo} />
      </div>
      <div className='flex flex-col gap-5'>
        {/* Player Stats Table */}
        <div className='p-2 bg-gray-100'>
          <div className='text-lg font-bold text-sky-900 p-1 ml-3 text-center'>Leaderboards</div>
        </div>
        <Leaderboards tableData={tableData} />
        {/* Rating History */}
        <div className='p-2 mt-3 bg-gray-100'>
          <div className='text-lg font-bold text-sky-900 p-1 ml-3 text-center'>Rating History</div>
        </div>
        <RatingHistoryChart ratingHistory={ratingHistoryDatasets} />
      </div >
    </div >
  )
}
