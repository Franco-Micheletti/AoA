'use client'
import Game from '@/components/game'
import { useState, useEffect } from 'react'
import { leaderboardShortName, filterFunctions } from '@/utilities/utilities'
import { updateProfileHistory } from '@/utilities/recentProfiles'
export default function PlayerGames ({ gameList, playerInfo }) {
  const [filterName, setFiltername] = useState('all')
  const listOfLeaderboards = playerInfo.playerLeaderboardStats.map((leaderboard) => {
    return (
      leaderboardShortName[leaderboard.leaderboard_id]
    )
  })
  useEffect(() => {
    updateProfileHistory(playerInfo)
  }, [])
  return (
    <div className="mt-4 flex flex-col justify-center bg-zinc-50 rounded-md items-center gameListAndFilter">
      {/* Filters */}
      <div className='flex flex-col w-full rounded-lg gap-1 text-black p-4'>
        <div className='flex flex-wrap gap-3 p-4'>
          {
            listOfLeaderboards.map((leaderboardShortName, index) => {
              return (
                <div key={index} onClick={() => setFiltername(leaderboardShortName)} className={`${filterName === leaderboardShortName ? 'bg-slate-500 border-slate-500 text-white' : 'hover:text-black hover:border-slate-300 hover:bg-slate-300 cursor-pointer'} p-1.5 text-sm rounded-md border-gray-200 border-solid border-2 text-gray-900`}>
                  {leaderboardShortName}
                </div>)
            })
          }
          {/* Unranked Lobby */}
          <div onClick={() => setFiltername('lobby')} className={`${filterName === 'lobby' ? 'bg-slate-500 border-slate-500 text-white' : 'hover:text-black hover:border-slate-300 hover:bg-slate-300 cursor-pointer'} p-1.5 text-sm rounded-md border-gray-200 border-solid border-2 cursor-pointer text-gray-900`}>Lobby</div>
          {/* Reset Filter */}
          <div onClick={() => setFiltername('all')} className={`${filterName === 'all' ? 'bg-slate-500 border-slate-500 text-white' : 'hover:text-black hover:border-slate-300 hover:bg-slate-300 cursor-pointer'} pl-3 pr-3 content-center text-sm rounded-md border-gray-200 border-solid border-2 text-gray-900`}>All</div>
        </div>
      </div>
      {
        gameList && gameList.length > 0
          ? <div className='mt-10 w-full'>
            {gameList.filter(filterFunctions[filterName]).sort(function (a, b) { return b.game.finished - a.game.finished }).map((game, index) => {
              return (
                <Game key={index} game={game} />
              )
            })
            }
          </div>
          : <></>
      }
    </div>
  )
}
