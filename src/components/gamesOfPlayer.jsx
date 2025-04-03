'use client'
import Game from '@/components/game'
import { useState, useEffect } from 'react'
import { leaderboardShortName, filterFunctions } from '@/utilities/utilities'
import { updateProfileHistory } from '@/utilities/recentProfiles'
export default function GamesOfPlayer({ gamesData, playerInfo }) {
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
    <div className="mt-5 flex flex-col justify-center bg-zinc-50 rounded-md items-center p-2 gameListAndFilter">
      {/* Filters */}
      <div className='bg-slate-200 flex flex-col p-2 w-full rounded-lg gap-1'>
        <div className='flex text-sm items-center justify-center mb-3 font-semibold'>Filters</div>
        <div className='flex flex-wrap gap-3 p-3'>
          {
            listOfLeaderboards.map((leaderboardShortName, index) => {
              return (
                <div key={index} onClick={() => setFiltername(leaderboardShortName)} className={`${filterName === leaderboardShortName ? 'bg-slate-600 border-slate-600 text-white' : ''} p-1.5 text-xs rounded-md border-slate-300 border-solid border-2 hover:bg-slate-300 hover:text-black hover:border-slate-300 cursor-pointer`}>
                  {leaderboardShortName}
                </div>)
            })
          }
          {/* Unranked Lobby */}
          <div onClick={() => setFiltername('lobby')} className={`${filterName === 'lobby' ? 'bg-slate-600 border-slate-600 text-white' : ''} p-1.5 text-xs rounded-md border-slate-300 border-solid border-2 hover:bg-slate-300 hover:text-black hover:border-slate-300 cursor-pointer`}>Lobby</div>
          {/* Reset Filter */}
          <div onClick={() => setFiltername('all')} className={`${filterName === 'all' ? 'bg-slate-600 border-slate-600 text-white' : ''} p-1.5 text-xs rounded-md border-slate-300 border-solid border-2 hover:bg-slate-300 hover:text-black hover:border-slate-300 cursor-pointer`}>All</div>
        </div>
      </div>
      {
        gamesData && gamesData.length > 0
          ? <div>
            {gamesData.filter(filterFunctions[filterName]).sort(function (a, b) { return b.game.finished - a.game.finished }).map((game, index) => {
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
