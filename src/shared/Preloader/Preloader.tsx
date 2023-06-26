import React from 'react'
import Logo from '../../assets/notes.png'

export default function Preloader() {
          return (
                    <div className="flex justify-center items-center h-screen">
                              <img src={Logo} className='w-20' alt="" />
                    </div>
          )
}
