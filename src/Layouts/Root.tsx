import React from 'react'
import { Outlet } from 'react-router-dom';
import Notes from '../pages/Notes/Notes';
import Footer from '../shared/Footer/Footer';

export default function Root() {
  return (
    <>
      <Notes />
      <Footer />
      <Outlet />
    </>
  )
}
