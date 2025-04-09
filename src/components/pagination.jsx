import Link from 'next/link'

export default function Pagination ({ pageNumber, profileId, gameList }) {
  return (
    <section className='flex justify-center w-full top-0 p-3 z-10 text-black rounded-sm mt-3 gap-3'>
      <Link href={`/player/${profileId}/page/${pageNumber - 1}`}>
        {pageNumber > 1
          ? <div className="pages-container"><div>{pageNumber - 1}</div></div>
          : <></>
        }
      </Link>
      {gameList.length === 50
        ? <Link href={`/player/${profileId}/page/${pageNumber + 1}`}>
          <div className="pages-container">
            {pageNumber + 1}
          </div>
        </Link>
        : <></>
      }
    </section>
  )
}
