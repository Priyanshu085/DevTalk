import React from 'react'
import Image from 'next/image'

const Loader = () => {
  return (
    <div>
      <Image 
        src="/icons/loading-circle.svg"
        alt='Loading'
        width={50}
        height={50}
      />
    </div>
  )
}

export default Loader
