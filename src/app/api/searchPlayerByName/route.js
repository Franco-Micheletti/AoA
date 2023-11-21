import { NextResponse } from 'next/server'
export async function GET (request) {
  const { searchParams } = new URL(request.url)
  const name = searchParams.get('name')
  const leaderboardId = searchParams.get('leaderboardId')

  const resPlayerQuery = await fetch(`${process.env.PLAYER_SEARCH}&leaderboard_id=${leaderboardId}&search=${name}&start=1&count=5`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET'
  }).then(data => data.json())

  const leaderboardList = resPlayerQuery.leaderboard
  return NextResponse.json(leaderboardList, { status: 200 })
}
