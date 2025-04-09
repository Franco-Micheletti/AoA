'use client'

import UpdateProfileButton from './updateProfileButton'

export default function OutdatedProfile ({ playerInfo }) {
  const dateNow = Math.round(new Date().getTime() / 1000, 2)
  const updatedAt = Math.round(playerInfo.last_update_at.getTime() / 1000, 2)
  const timeSinceUpdate = Math.round((dateNow - updatedAt) / 1800, 2)

  return (
    <div className='text-black'>
      {
        timeSinceUpdate > 1
          ? <div className='bg-gray-100 flex text-sm flex-col rounded-lg p-8 mt-4 gap-2 outdated'>
            <div className=' font-normal text-base'>This Profile is outdated, click to update</div>
            <UpdateProfileButton profileId={playerInfo.profile_id} />
          </div>
          : <></>
      }
    </div>
  )
}
