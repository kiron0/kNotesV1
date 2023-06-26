import React from 'react'
import { Outlet } from 'react-router-dom';
import Notes from '../pages/Home/Notes/Notes';
import Footer from '../shared/Footer/Footer';
import useTitle from '../hooks/useTitle';

export default function Root() {
  useTitle("Home");
  return (
    <>
      <Notes />
      <Footer />
      <Outlet />
    </>
  )
}
