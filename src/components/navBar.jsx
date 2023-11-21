import Link from 'next/link'
export const NavBar = () => {
  return (
    <section className='flex justify-start w-full bg-zinc-50 top-0 absolute p-3 z-10'>
        <Link className='flex hover:bg-slate-300 p-3 rounded-md' href={'/'}>
            <div className='flex justify-center text-sm font-mono font-semibold text-slate-800 index-title'>AGE OF ANALYTICS</div>
        </Link>
    </section>
  )
}
