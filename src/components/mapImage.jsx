import React, { useState } from 'react'
import Image from 'next/image'

export const MapImage = (src) => {
  const [imageSrc, setImageSrc] = useState(src)
  return (
    <Image alt='Map Image' width={120} height={120} src={imageSrc} onError={() => { setImageSrc('/images/map_icons/null.png') }}></Image>
  )
}
