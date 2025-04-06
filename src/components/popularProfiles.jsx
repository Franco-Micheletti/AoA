import Link from 'next/link'
import { popularPlayersData } from '@/utilities/utilities'
import Image from 'next/image'
export const PopularProfiles = () => {
  return (
    <section className='flex flex-col justify-center items-start mt-2 z-50 w-full gap-3 text-black'>
      <div className='text-base p-1'>Popular Profiles</div>
      {
        popularPlayersData.map((player, index) => {
          return (
            <Link style={{ borderWidth: '1px' }} key={index} className='flex justify-start hover:bg-sky-800 hover:text-white hover:border-transparent rounded-md p-1 border-gray-300 w-72' href={`/player/${player.id}/page/1`}>
              <div className='flex justify-center items-center gap-3 p-1 rounded-md'>
                <Image alt={'flag'} width={30} height={30} src={`/images/flags_icons/${player.country}.png`}></Image>
                <div className='text-sm'>{player.name}</div>
              </div>
            </Link>
          )
        }
        )
      }
    </section>
  )
}
