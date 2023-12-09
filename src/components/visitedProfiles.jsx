import { useState, useEffect } from 'react'
import { getProfilesHistory } from '@/utilities/recentProfiles'
import Link from 'next/link'
import Image from 'next/image'
export const VisitedProfiles = () => {
  const [visitedProfiles, setVisitedProfiles] = useState([])
  useEffect(() => {
    setVisitedProfiles(getProfilesHistory())
  }, [])
  return (
    visitedProfiles &&
    <div className='flex flex-col justify-center items-start mt-2 z-50 w-full gap-3 text-black'>
      <div className='text-base p-1'>Recent Profiles</div>
      <div className='flex flex-col justify-start items-center gap-2 overflow-y-auto h-48'>
        {
          visitedProfiles.map((profile, index) => {
            return (
                <Link style={{ borderWidth: '1px' }} key={index} className='flex justify-start hover:bg-sky-800 hover:text-white hover:border-transparent rounded-md p-1 border-gray-300 w-72' href={`/player/${profile.profileId}`}>
                  <div className='flex justify-center items-center gap-3 p-1 rounded-md'>
                      <Image alt={'flag'} width={30} height={30} src={`/images/flags_icons/${profile.country.toUpperCase()}.png`}></Image>
                      <div className='text-sm'>{profile.alias}</div>
                  </div>
                </Link>
            )
          })
        }
      </div>
    </div>
  )
}
