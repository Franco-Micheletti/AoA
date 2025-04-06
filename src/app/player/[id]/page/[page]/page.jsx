import PlayerInfo from '@/components/playerInfo'
import PlayerGames from '@/components/playerGames'
import OutdatedProfile from '@/components/outdatedProfile'
import { queryPlayerInfo } from '../../../../../../prisma/client/playerInfo/queryPlayerInfo'
import { queryPlayerGames } from '../../../../../../prisma/client/games/queryPlayerGames'
import { NavBar } from '@/components/navBar'
import Image from 'next/image'
import Pagination from '@/components/pagination'

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
      return playerInfo
    }
  }

  const getGamesList = async (profileId, pageNumber) => {
    const games = await queryPlayerGames(profileId, pageNumber)
    if (games.length === 0) {
      // Create player games from the AoE2 endpoint
      const createPlayerGamesResponse = await apiCreatePlayerGames(profileId)
      if (createPlayerGamesResponse.code === 1) {
        const games = await queryPlayerGames(profileId, pageNumber)
        return games
      } else {
        console.log('------------ Player Games not created ------------', '\nERROR :', createPlayerGamesResponse.error)
        return null
      }
    } else {
      return games
    }
  }

  const playerInfo = await getPlayerInfo(profileId)
  const gamesList = await getGamesList(profileId, pageNumber)

  return (
    <div className='bg-black/70 flex flex-col justify-start items-center h-auto min-h-screen p-2'>
      <NavBar />
      <section>
        {
          playerInfo !== null
            ? <section>
              <PlayerInfo playerInfo={playerInfo} />
              <OutdatedProfile playerInfo={playerInfo} />
              {
                gamesList !== null
                  ? <PlayerGames gamesList={gamesList} playerInfo={playerInfo} />
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
        gamesList !== null
          ? <Pagination pageNumber={pageNumber} profileId={profileId} />
          : <></>
      }
    </div>
  )
}
