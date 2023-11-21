'use client'

import UpdateProfileButton from './updateProfileButton'

export default function OutdatedProfile ({ playerInfo }) {
  const dateNow = Math.round(new Date().getTime() / 1000, 2)
  const updatedAt = Math.round(playerInfo.last_update_at.getTime() / 1000, 2)
  const timeSinceUpdate = Math.round((dateNow - updatedAt) / 1800, 2)

  return (
        <div>
            {
        timeSinceUpdate > 1
          ? <div className='bg-zinc-50 w-72 flex text-sm flex-col rounded-lg p-3 mt-4 gap-2 outdated'>
              <div>This Profile is outdated, click to update</div>
              <UpdateProfileButton profileId={playerInfo.profile_id} />
            </div>
          : <></>
      }

        </div>
  )
}
