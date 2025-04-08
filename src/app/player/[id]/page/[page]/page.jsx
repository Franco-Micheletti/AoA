import PlayerInfo from '@/components/playerInfo'
import PlayerGames from '@/components/playerGames'
import { queryPlayerInfo } from '../../../../../../prisma/client/playerInfo/queryPlayerInfo'
import { queryPlayerGames } from '../../../../../../prisma/client/games/queryPlayerGames'
import { NavBar } from '@/components/navBar'
import Image from 'next/image'
import Pagination from '@/components/pagination'
import { updateHasToBeUpdatedField } from '../../../../../../prisma/client/playerInfo/updateHasToBeUpdatedField'

const apiCreatePlayerInfo = async (id) => {
  const res = await fetch(`${process.env.URL}/api/createPlayerInfo?profile_id=${id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
  const jsonRes = await res.json()
  return jsonRes
}

const apiCreatePlayerGames = async (id) => {
  const res = await fetch(`${process.env.URL}/api/createPlayerGames?profile_id=${id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
  const jsonRes = await res.json()

  return jsonRes
}

const apiUpdatePlayerLeaderboards = async (id) => {
  const statsRes = await fetch(`${process.env.URL}/api/updatePlayerLeaderboards?profile_id=${id}`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
  const jsonRes = await statsRes.json()

  return jsonRes
}

export default async function Player ({ params }) {
  const { id, page } = params
  const profileId = parseInt(id)
  const pageNumber = parseInt(page)

  const getPlayerInfo = async (profileId) => {
    const playerInfo = await queryPlayerInfo(profileId)
    if (playerInfo === null) {
      // Creates player info using data from AoE2 endpoint
      const createPlayerInfoResponse = await apiCreatePlayerInfo(profileId)
      // If the database is updated correctly fetch player info from AoA database
      if (createPlayerInfoResponse.code === 1) {
        const playerStats = await queryPlayerInfo(profileId)
        return playerStats
      } else {
        console.log('------------ Player Info not created ------------', '\nERROR :', createPlayerInfoResponse.error)
        return null
      }
    } else {
      // The player exist
      // Check if the player was created from another profile
      if (playerInfo.hasToBeUpdated === true) {
        // Update Leaderboards
        const responseUpdateLeaderboards = await apiUpdatePlayerLeaderboards(profileId)
        if (responseUpdateLeaderboards.code === 1) {
          const playerData = await queryPlayerInfo(profileId)
          return playerData
        } else {
          console.log('ERROR - Leaderboards were not updated')
        }
      } else {
        return playerInfo
      }
    }
  }

  const getgameList = async (profileId, pageNumber, playerInfo) => {
    const games = await queryPlayerGames(profileId, pageNumber)
    if (games.length === 0 | playerInfo.hasToBeUpdated === true) {
      if (playerInfo.hasToBeUpdated === true) {
        // Update the field to false so we are not updating it automatilly the next time
        const status = await updateHasToBeUpdatedField(playerInfo)
      }
      // Create player games from the AoE2 endpoint if there are no games in AoA database
      const createPlayerGamesResponse = await apiCreatePlayerGames(profileId)
      if (createPlayerGamesResponse.code === 1) {
        const updatedGames = await queryPlayerGames(profileId, pageNumber)
        return updatedGames
      } else {
        console.log('------------ Player Games not created ------------', '\nERROR :', createPlayerGamesResponse.error)
        return null
      }
    } else {
      return games
    }
  }

  const playerInfo = await getPlayerInfo(profileId)
  const gameList = await getgameList(profileId, pageNumber, playerInfo)

  return (
    <div className='bg-black/70 flex flex-col justify-start items-center h-auto min-h-screen p-2'>
      <NavBar />
      <section>
        {
          playerInfo !== null
            ? <section>
              <PlayerInfo playerInfo={playerInfo} />
              {
                gameList !== null
                  ? <PlayerGames gameList={gameList} playerInfo={playerInfo} />
                  : <div className='bg-zinc-50 text-black p-3 rounded-md justify-center text-center mt-5'>No games have been found</div>
              }
            </section>

            : <div className='flex flex-col gap-3 bg-zinc-50 z-50 mt-24 p-5 w-full rounded-md font-bold text-lg justify-center items-center text-black'>
              <div>Profile not found</div>
              <Image className='rounded-lg' width={200} height={200} alt={'playernotfound'} src={'/images/index_images/playerNotFound.png'}></Image>
            </div>
        }

      </section>
      {
        gameList !== null
          ? <Pagination pageNumber={pageNumber} profileId={profileId} gameList={gameList} />
          : <></>
      }
    </div>
  )
}
