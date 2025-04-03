'use client'
import Link from 'next/link'
import Image from 'next/image'
export const SearchByNameResult = ({ playerList }) => {
  return (
    <section className='flex w-full justify-center mt-4'>
      <div className='flex flex-wrap p-3 gap-2 justify-center items-center max-w-3xl'>
        {
          playerList.map(player => {
            return (
              <Link className='flex cursor-pointer justify-start items-center bg-white hover:bg-sky-700 text-cyan-800 hover:text-white rounded-md w-72 shadow-sm' href={`/player/${player.members[0].profile_id}`}>
                <div className='flex justify-center items-center p-2 rounded-md max-w-full gap-3'>
                  <Image alt={'flag'} width={35} height={30} src={`/images/flags_icons/${player.members[0].country !== null ? player.members[0].country.toUpperCase() : 'NOFLAG'}.png`}></Image>
                  <div className='text-sm'>{player.members[0].alias}</div>
                </div>
              </Link>
            )
          })
        }
      </div>
    </section>
  )
}
