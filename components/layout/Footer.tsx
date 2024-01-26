import React from 'react'
import packageInfo from '@/package.json';


const Footer = () => {
  return (
    <div className='text-center text-blue-600/50 font-light'>Navika app. version {packageInfo.version}</div>
  )
}

export default Footer