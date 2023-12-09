'use client'
import { useState } from 'react'
import { SearchByNameResult } from './searchByNameResult'
import { VisitedProfiles } from './visitedProfiles'
import { PopularProfiles } from './popularProfiles'
export const SearchByName = ({ width, height }) => {
  const [playerList, setplayerList] = useState('')

  const searchPlayer = async (name, leaderboardId) => {
    const res = await fetch(`/api/searchPlayerByName?name=${name}&leaderboardId=${leaderboardId}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'GET'
    })
    const json = await res.json()
    return json
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const { elements } = event.currentTarget
    const input = elements.namedItem('alias')
    // eslint-disable-next-line no-undef
    const isInput = input instanceof HTMLInputElement
    if (!isInput || input === null) { return }
    const players = await searchPlayer(input.value, 3)
    setplayerList(players)
    input.value = ''
  }

  return (
    <section className='flex flex-col justify-start z-50 absolute bg-white/95 w-auto h-auto shadow-lg p-10 transition-transform rounded-md'>
      <div className='flex flex-col w-full justify-center items-start gap-1' >
          <div className='flex w-auto justify-start text-base text-black p-1 rounded-md'>Search</div>
          <form onSubmit={handleSubmit} className='flex gap-3'>
            <label>
                <input style={{ borderWidth: '1px' }} name='alias' type='text' placeholder='Search player' className='bg-zinc-50 rounded-lg p-3 text-sm text-gray-600 outline-transparent outline-0 search-input'></input>
            </label>
            {
              width < 525 && <button className='bg-zinc-50 p-3 text-black rounded-md text-sm shadow-md'>Search</button>
            }
          </form>
      </div>
      {
        playerList !== ''
          ? playerList.length > 0
            ? <SearchByNameResult playerList={playerList} />
            : <div className='flex justify-center items-center text-black p-3 mt-5 rounded-md'>Player not found</div>
          : <div>
            <VisitedProfiles />
            <PopularProfiles />
          </div>
      }
    </section>
  )
}
