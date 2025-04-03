import PlayerInfo from '@/components/playerInfo'
import GamesOfPlayer from '@/components/gamesOfPlayer'
import OutdatedProfile from '@/components/outdatedProfile'
import { queryPlayerInfo } from '../../../../prisma/client/queryPlayerInfo'
import { queryGamesOfPlayer } from '../../../../prisma/client/queryGamesOfPlayer'
import { NavBar } from '@/components/navBar'
import Image from 'next/image'
const apiUpdatePlayerStats = async (id) => {
  const res = await fetch(`${process.env.URL}/api/updatePlayerStats?profile_id=${id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
  const jsonRes = await res.json()
  return jsonRes
}

const apiUpdatePlayerGames = async (id) => {
  const res = await fetch(`${process.env.URL}/api/updatePlayerGames?profile_id=${id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
  const jsonRes = await res.json()
  return jsonRes
}

export default async function Player ({ params }) {
  const { id } = params
  const profileId = parseInt(id)

  const checkIfPlayerExistAndGetData = async (profileId) => {
    const checkIfPlayerExists = await queryPlayerInfo(profileId)
    if (checkIfPlayerExists === null) {
      // Update Player Stats
      const playerStatsResult = await apiUpdatePlayerStats(profileId)
      // If player was not found in API
      if (playerStatsResult.code === 6) {
        return [null, null]
      }
      // Update Player Games
      const playerGamesResult = await apiUpdatePlayerGames(profileId)
      // If player stats were updated correctly
      if (playerStatsResult.code === 1 && playerGamesResult.code === 1) {
        const playerStats = await queryPlayerInfo(profileId)
        const playerGames = await queryGamesOfPlayer(profileId)
        
        return [playerStats, playerGames]
      }
    } else {
      const gamesData = await queryGamesOfPlayer(profileId)
      return [checkIfPlayerExists, gamesData]
    }
  }
  const [playerInfo, gamesData] = await checkIfPlayerExistAndGetData(profileId)
  return (
    <div className='bg-black/70 flex flex-col justify-start items-center h-auto min-h-screen p-2'>
      <NavBar />
      {
        playerInfo !== null && gamesData !== null
          ? <section>
              <PlayerInfo playerInfo={playerInfo}/>
              <OutdatedProfile playerInfo={playerInfo} />
              <GamesOfPlayer gamesData={gamesData} playerInfo={playerInfo}/>
            </section>
          : <div className='flex flex-col gap-3 bg-zinc-50 z-50 mt-24 p-5 w-full rounded-md font-bold text-lg justify-center items-center'>
            <div>Profile not found</div>
            <Image className='rounded-lg' width={200} height={200} alt={'playernotfound'} src={'/images/index_images/playerNotFound.png'}></Image>
          </div>
      }
    </div>
  )
}
