import CivImage from './civImage'
import Link from 'next/link'
import { playerColorNames } from '@/utilities/utilities'
export default function Team ({ playerList }) {
  return (
    <div className='flex flex-col bg-slate-100 rounded-lg p-2 gap-1 team'>
      {
        playerList.map((playerData, index) => {
          const ratingChange = playerData.new_rating - playerData.old_rating
          return (
            <div key={index} className='flex justify-between items-center'>
              <div className='flex justify-start items-center gap-2'>
                <div className='flex text-gray-700 w-6 font-semibold justify-center rounded-sm' style={{ backgroundColor: playerColorNames[playerData.color_id] }}>{playerData.color_id}</div>
                <CivImage code={playerData.civ_id} />
                <Link className='flex flex-wrap text-sm h-auto text-cyan-600 cursor-pointer hover:bg-slate-300 rounded-sm' href={`/player/${playerData.player.profile_id}`}>{playerData.player.alias}</Link>
              </div>
              {
                ratingChange > 0
                  ? <div className='bg-green-500 text-xs flex justify-center items-center p-2 w-7 h-7 font-semibold'>+{ratingChange}</div>
                  : <div className='bg-red-500 text-xs flex justify-center items-center p-2 w-7 h-7 font-semibold'>{ratingChange}</div>
              }
            </div>
          )
        })
      }
    </div>
  )
}
