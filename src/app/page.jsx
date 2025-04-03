'use client'
import { useState, useEffect } from 'react'
import { SearchByName } from '@/components/searchByName'
import { NavBar } from '@/components/navBar'

export default function Page() {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  useEffect(() => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  }, [])

  return (
    <div className="bg-white text-white w-full justify-center items-center flex flex-col min-h-full h-auto">
      <NavBar />
      <div className='flex flex-col justify-end items-center'>
        <div className='flex'>
          <img width={width} height={height} className='z-0 index w-screen h-auto'></img>
        </div>
      </div>
      <SearchByName width={width} />
    </div>
  )
}
