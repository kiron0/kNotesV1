import React, { createContext, useEffect, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import { nanoid } from 'nanoid';
import { Toaster, toast } from 'react-hot-toast';
import { AppName } from './AppName';
import NotFound from './shared/NotFound/NotFound';
import Root from './Layouts/Root';
import Note from './pages/Note/Note';
import Login from './pages/Authentication/Login/Login';
import Dashboard from './pages/ManageDashboard/Dashboard/Dashboard';
import RequireAdmin from './auth/RequireAdmin/RequireAdmin';
import RequireAuth from './auth/RequireAuth/RequireAuth';
import Index from './pages/ManageDashboard/Index/Index';
import Setting from './pages/ManageDashboard/Setting/Setting';
import AllNotes from './pages/ManageDashboard/AllNotes/AllNotes';
import V2 from './pages/V2/Dashboard/V2';
import NotesV2 from './pages/V2/NotesV2/NotesV2';
import IndexV2 from './pages/V2/IndexV2/IndexV2';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
  {
    path: '/v2',
    element: <V2 />,
    children: [
      {
        path: '/v2',
        element: <IndexV2 />,
      },
      {
        path: '/v2/notes/:id',
        element: <NotesV2 />,
      }
    ],
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
  const [notesV2, setNotes] = useState(localStorage.getItem('kNotesV2') ? JSON.parse(localStorage.getItem('kNotesV2') as any) : []);

  const addNewNote = () => {
    const newNote = {
      id: nanoid(20),
      title: '',
      content: '',
      wordCount: 0,
      characterCount: 0,
      time: Date.now(),
      author: AppName,
    };
    const newNotes = [...notesV2, newNote];
    setNotes(newNotes);
    localStorage.setItem('kNotesV2', JSON.stringify(newNotes));
    router.navigate(`/v2/notes/${newNote.id}`);
  }

  const handleTitleChange = (id: any, title: any) => {
    if (title.length > 50) {
      toast.error('Title should be less than 50 characters', {
        position: 'top-right',
      });
      return;
    } else {
      const updatedNotes = notesV2.map((note: any) => {
        if (note.id === id) {
          note.title = title;
        }
        return note;
      });

      setNotes(updatedNotes);
      localStorage.setItem('kNotesV2', JSON.stringify(updatedNotes));
    }
  };

  const handleNoteChange = (id: any, content: any) => {
    const updatedNotes = notesV2.map((note: any) => {
      if (note.id === id) {
        note.content = content;
        if (content === '') {
          note.wordCount = 0;
          note.characterCount = 0;
        } else {
          note.wordCount = content.trim().split(/\s+/).length;
        }
        note.characterCount = content.length;
      }

      return note;
    }
    );

    setNotes(updatedNotes);
    localStorage.setItem('kNotesV2', JSON.stringify(updatedNotes));
  };

  const handleNoteBlur = (id: any) => {
    const updatedNotes = notesV2.map((note: any) => {
      if (note.id === id) {
        note.time = Date.now();
      }
      return note;
    });

    setNotes(updatedNotes);
    localStorage.setItem('kNotesV2', JSON.stringify(updatedNotes));
  };

  const formatDate = (value: any) => {
    if (!value) return "";

    const date = new Date(value);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let hrs = date.getHours() as any;
    let amPm = hrs >= 12 ? "PM" : "AM";
    hrs = hrs % 12;
    hrs = hrs ? hrs : 12;
    hrs = hrs < 10 ? "0" + hrs : hrs;

    let min = date.getMinutes() as any;
    min = min < 10 ? "0" + min : min;

    let sec = date.getSeconds() as any;
    sec = sec < 10 ? "0" + sec : sec;

    let day = date.getDate();
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    const dayName = dayNames[date.getDay()];

    return `${hrs}:${min}:${sec} ${amPm}, ${dayName} ${day} ${month} ${year}`;
  };

  const handleDeleteNote = (id: any) => {
    Swal.fire({
      text: 'Are you sure to delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result: any) => {
      if (result.isConfirmed) {
        const updatedNotes = notesV2.filter((note: any) => note.id !== id);
        setNotes(updatedNotes);
        if (notesV2.length === 1) {
          localStorage.removeItem('kNotesV2');
        } else {
          localStorage.setItem('kNotesV2', JSON.stringify(updatedNotes));
        }
        Swal.fire({
          title: 'Deleted!',
          text: 'Your note has been deleted.',
          icon: 'success',
          timer: 1000,
          showConfirmButton: false,
        });
      }
    }
    )
  };

  const handleClearNote = (id: any) => {
    if (notesV2.find((note: any) => note.id === id).content === '') {
      return toast.error('Nothing to clear!', {
        position: 'top-right',
      })
    } else {
      Swal.fire({
        text: 'Are you sure to clear?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, clear it!'
      }).then((result: any) => {
        if (result.isConfirmed) {
          const updatedNotes = notesV2.map((note: any) => {
            if (note.id === id) {
              note.content = '';
              note.wordCount = 0;
              note.characterCount = 0;
            }
            return note;
          });
          setNotes(updatedNotes);
          localStorage.setItem('kNotes', JSON.stringify(updatedNotes));
          toast.success('Note cleared!', {
            position: 'top-right',
          })
        }
      })
    }
  };

  const handleDownload = (id: any) => {
    const text = notesV2.find((note: any) => note.id === id).content;
    if (text === '') {
      return toast.error('Nothing to download!', {
        position: 'top-right',
      })
    } else {
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `KNotes-${text.slice(0, 10)}.txt`;
      link.click();
      URL.revokeObjectURL(url);
      link.remove();
    }
  };

  const handleCopyToClipboard = (id: any) => {
    const text = notesV2.find((note: any) => note.id === id).content;
    if (text === '') {
      return toast.error('Nothing to copy!', {
        position: 'top-right',
      })
    } else {
      navigator.clipboard.writeText(text);
      toast.success('Note Copied to clipboard!', {
        position: 'top-right',
      })
    }
  };

  useEffect(() => {
    document.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
  }, []);

  return (
    <InitializeContext.Provider value={{ formatDate, handleTitleChange, handleNoteChange, handleDeleteNote, notesV2, addNewNote, handleNoteBlur, handleCopyToClipboard, handleClearNote, handleDownload }}>
      <RouterProvider router={router} />
      <Toaster />
    </InitializeContext.Provider>
  );
}


export default App;
