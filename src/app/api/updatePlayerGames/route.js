import { NextResponse } from 'next/server'
import { updatePlayerGames } from '../../../../prisma/client/createNewGames'
import { decodeSlotInfo, decodeOptions } from '@/utilities/decodeBase64'
import { mapNames } from '@/utilities/utilities'
export async function POST (request) {
  const { searchParams } = new URL(request.url)
  const profileId = searchParams.get('profile_id')

  const resGamesData = await fetch(`${process.env.MATCH_HISTORY}[${profileId}]`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET'
  })
  // array of games
  const gamesData = await resGamesData.json()
  const games = gamesData.matchHistoryStats
  if (games.length > 0) {
    const cleanData = games
      .map(object => {
        const slotInfoDecoded = decodeSlotInfo(object.slotinfo)
        const optionsDecoded = decodeOptions(object.options)
        const gamePlayersList = object.matchhistorymember
          .map(player => {
            const playerPersonalInfo = gamesData.profiles.filter(object => object.profile_id === player.profile_id)
            const playerSlotInfo = slotInfoDecoded.filter(slot => slot.profileId === player.profile_id)
            return ({
              profile_id: player.profile_id,
              alias: playerPersonalInfo[0].alias,
              country_code: playerPersonalInfo[0].country,
              color_id: playerSlotInfo[0].stationID,
              old_rating: player.oldrating,
              new_rating: player.newrating,
              team_id: playerSlotInfo[0].teamID,
              civ_id: playerSlotInfo[0].raceID,
              result_id: player.outcome
            })
          })
        return {
          unique_id: object.id,
          map_name: mapNames[parseInt(optionsDecoded.location)],
          max_player: object.maxplayers,
          matchtype_id: object.matchtype_id,
          description: object.description,
          started: object.startgametime,
          finished: object.completiontime,
          gamePlayers: gamePlayersList
        }
      })
    const status = await updatePlayerGames(cleanData)
    return NextResponse.json({ code: status.code, error: status.error }, { status: 200 })
  }

  return NextResponse.json({ code: 0 }, { status: 200 })
}
