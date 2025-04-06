import { NextResponse } from 'next/server'
import { createPlayerInfo } from '../../../../prisma/client/playerInfo/createPlayerInfo'

export async function POST (request) {
  const { searchParams } = new URL(request.url)
  const profileId = searchParams.get('profile_id')

  const resPlayerStats = await fetch(`${process.env.PLAYER_STATS}[${profileId}]`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET'
  })
  const playerStats = await resPlayerStats.json()

  if (playerStats.result.code === 6) {
    return NextResponse.json({ code: 6, error: 'Profile not found' }, { status: 404 })
  }
  const cleanedData = {
    personalInfo: {
      profile_id: playerStats.statGroups[0].members[0].profile_id,
      steam_id: playerStats.statGroups[0].members[0].name.split('/')[2],
      country_code: playerStats.statGroups[0].members[0].country,
      alias: playerStats.statGroups[0].members[0].alias
    },
    leaderboards: playerStats.leaderboardStats
  }
  // PRISMA QUERY
  const status = await createPlayerInfo(cleanedData)

  return NextResponse.json({ code: status.code, error: status.error }, { status: 200 })
}
