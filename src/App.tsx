import React, { createContext, useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import NotFound from './shared/NotFound/NotFound';
import { Toaster } from 'react-hot-toast';
import Root from './Layouts/Root';
import Note from './pages/Note/Note';
import Preloader from './shared/Preloader/Preloader';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_API } from './config';
import Login from './pages/Authentication/Login/Login';
import Dashboard from './pages/ManageDashboard/Dashboard/Dashboard';
import RequireAdmin from './auth/RequireAdmin/RequireAdmin';
import RequireAuth from './auth/RequireAuth/RequireAuth';
import Index from './pages/ManageDashboard/Index/Index';
import Setting from './pages/ManageDashboard/Setting/Setting';
import AllNotes from './pages/ManageDashboard/AllNotes/AllNotes';

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
    path: "/getStarted",
    element: <Login />
  },
  {
    path: '/adminDash',
    element:
      <RequireAuth>
        <RequireAdmin>
          <Dashboard />
        </RequireAdmin>
      </RequireAuth>,
    children: [
      {
        path: '/adminDash',
        element: <Index />,
      },
      {
        path: '/adminDash/allNotes',
        element: <AllNotes />,
      },
      {
        path: '/adminDash/setting',
        element: <Setting />,
      },
      {
        path: '*',
        element: <NotFound />
      }
    ],
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

export const InitializeContext = createContext(null as any);

function App() {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    document.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  }, []);

  const { data, refetch } = useQuery(["appName"], async () => {
    const res = await axios.get(`${BASE_API}/app/appName`);
    return res?.data;
  });

  const appName = data?.appName;

  return (
    <InitializeContext.Provider value={{ appName, refetch }}>
      {
        loading ? (
          <Preloader />
        ) :
          (
            <>
              <RouterProvider router={router} />
              <Toaster />
            </>
          )
      }
    </InitializeContext.Provider>
  );
}


export default App;
