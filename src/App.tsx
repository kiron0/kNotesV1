import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import NotFound from './shared/NotFound/NotFound';
import { Toaster } from 'react-hot-toast';
import Root from './Layouts/Root';
import Note from './pages/Note/Note';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
  {
    path: '/note/:id',
    element: <Note />,
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
