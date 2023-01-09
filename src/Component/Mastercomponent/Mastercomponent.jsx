import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

export default function Mastercomponent({details,logOut}) {
  return (
    <><Navbar tokenDetails={details} logOut={logOut}/>
    
    <div className="">
      <Outlet/>
    </div>
    </>
  )
}
