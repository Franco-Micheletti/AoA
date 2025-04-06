import { NextResponse } from 'next/server'
import { updatePlayerLeaderboards } from '../../../../prisma/client/leaderboards/updatePlayerLeaderboards'
export async function POST (request) {
  const { searchParams } = new URL(request.url)
  const profileId = parseInt(searchParams.get('profile_id'))
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
  const leaderboards = playerStats.leaderboardStats
  // PRISMA UPDATE QUERY
  const status = await updatePlayerLeaderboards(leaderboards, profileId)

  return NextResponse.json({ code: status.code, error: status.error }, { status: 200 })
}
