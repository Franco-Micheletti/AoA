import CivImage from './civImage'
import Link from 'next/link'
import { playerColorNames } from '@/utilities/utilities'
export default function Team ({ playerList, isWinner }) {
  return (
    <div className={'flex flex-col rounded-lg gap-1 team'}>
      {
        playerList.map((playerData, index) => {
          const ratingChange = playerData.new_rating - playerData.old_rating
          return (
            <div key={index} className='flex justify-between items-center'>
              <div className='flex justify-start items-center gap-2'>
                <div className='flex text-gray-900 w-9 h-8 items-center font-semibold justify-center rounded-sm' style={{ backgroundColor: playerColorNames[playerData.color_id] }}>{playerData.color_id}</div>
                <CivImage code={playerData.civ_id} />
                <Link className='cursor-pointer hover:bg-gray-200 hover:rounded-md' href={`/player/${playerData.player.profile_id}/page/1`}>
                  <div className='flex flex-wrap text-base font-semibold h-auto text-sky-900'>{playerData.player.alias}</div>
                </Link>
              </div>
              {
                ratingChange > 0
                  ? <div className='bg-green-300 rounded-sm text-sm
                                    flex
                                    justify-center
                                    items-center
                                    pl-3 pr-3 pb-2 pt-2
                                    w-10 h-10
                                    text-gray-900'>
                    <div className='w-12'>+{ratingChange}</div>
                  </div>
                  : <div className='bg-red-300
                                      rounded-sm
                                      text-sm flex
                                      justify-center
                                      items-center
                                      pl-3 pr-3
                                      pb-2 pt-2
                                      w-10 h-10
                                      text-gray-900'>
                    {ratingChange}
                  </div>
              }
            </div>
          )
        })
      }
    </div>
  )
}
