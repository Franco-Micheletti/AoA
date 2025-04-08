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
    <div className="bg-zinc-50 mt-24 flex p-2 rounded-md playerInfo">
      {/* Player Portrait */}
      <div className='flex flex-col p-4 gap-5 justify-start bg-gray-100 w-96 rounded-md'>
        {/* Flag Image */}
        <div className='flex flex-col items-center gap-3 mt-2 mb-2'>
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
      <div className='flex flex-col gap-5 justify-center p-8'>
        {/* Player Stats Table */}
        <div className='text-lg font-bold text-black pt-3'>Leaderboards</div>
        <Leaderboards tableData={tableData} />
        {/* Rating History */}
        <RatingHistoryChart ratingHistory={ratingHistoryDatasets} />
      </div>
    </div>
  )
}
