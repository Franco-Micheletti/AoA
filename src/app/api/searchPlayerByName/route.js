import { NextResponse } from 'next/server'
export async function GET (request) {
  const { searchParams } = new URL(request.url)
  const name = searchParams.get('name')
  const requestUrl = `${process.env.PLAYER_SEARCH}[${name}]`

  const resPlayerQuery = await fetch(`${process.env.PLAYER_SEARCH}[${name}]`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET'
  }).then(data => data.json())

  const listOfPlayers = resPlayerQuery.statGroups

  return NextResponse.json(listOfPlayers, { status: 200 })
}
