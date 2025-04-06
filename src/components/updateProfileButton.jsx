'use client'

import { useState } from 'react'
export default function UpdateProfileButton ({ profileId }) {
  const [loading, setloading] = useState(false)
  const updateProfile = async (id) => {
    setloading(true)
    const statsRes = await fetch(`/api/updatePlayerLeaderboards?profile_id=${id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
    await fetch(`/api/createPlayerGames?profile_id=${id}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
    const jsonRes = await statsRes.json()
    if (jsonRes.code === 1) {
      setloading(false)
      window.location.href = `/player/${profileId}/page/1`
    }
  }

  return (
    <div className='flex gap-4'>
      {
        loading &&
        <div className='flex p-3 justify-center'>
          <img width={75} height={75} src='/images/index_images/loading.gif'></img>
        </div>
      }
      <button onClick={() => updateProfile(profileId)} className='bg-zinc-50 flex p-2 w-24 h-12 justify-center items-center rounded-md text-sm cursor-pointer hover:bg-slate-200 border-2 border-slate-200'>
        Update
      </button>
    </div>
  )
}
