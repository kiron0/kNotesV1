import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import NotFound from './shared/NotFound/NotFound';
import { Toaster } from 'react-hot-toast';
import Root from './Layouts/Root';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
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
