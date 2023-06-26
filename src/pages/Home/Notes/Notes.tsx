import React, { useState, useEffect, useContext } from 'react'
import NoteImg from '../../../assets/notes.png'
import { FiTrash, FiDownload, FiClipboard, FiShare2 } from 'react-icons/fi'
import { RxReset } from 'react-icons/rx'
import { AiOutlineSetting } from 'react-icons/ai'
import Swal from 'sweetalert2';
import { toast } from 'react-hot-toast';
import { Link, NavLink } from 'react-router-dom';
import SettingModal from './SettingModal'
import axios from 'axios';
import { nanoid } from 'nanoid';
import { BASE_API } from '../../../config'
import { InitializeContext } from '../../../App'
import { signOut } from 'firebase/auth'
import auth from '../../../auth/Firebase/firebase.init'
import { useAuthState } from 'react-firebase-hooks/auth'

export default function Notes() {
  const { appName } = useContext(InitializeContext);
  const [user] = useAuthState(auth);
  const [notes, setNotes] = useState(localStorage.getItem('kNotes') ? JSON.parse(localStorage.getItem('kNotes') as any) : []);
  const [setting, setSetting] = useState(localStorage.getItem('kNotesSetting') ? JSON.parse(localStorage.getItem('kNotesSetting') as any) : {
    showCharWord: 'true',
  });

  const updateNote = (id: any) => {
    axios.patch(`${BASE_API}/note?id=${id}`, {
      content: notes.find((note: any) => note.id === id).content,
      wordCount: notes.find((note: any) => note.id === id).wordCount,
      characterCount: notes.find((note: any) => note.id === id).characterCount,
    })
  }

  useEffect(() => {
    if (notes.length === 0) {
      const newNote = {
        id: nanoid(20),
        content: '',
        wordCount: 0,
        characterCount: 0,
        time: Date.now(),
        author: appName,
      };
      const newNotes = [...notes, newNote];
      setNotes(newNotes);
      localStorage.setItem('kNotes', JSON.stringify(newNotes));
      axios.post(`${BASE_API}/notes`, newNote);
    }
  }, [notes, appName]);

  const handleDownload = (id: any) => {
    const text = notes.find((note: any) => note.id === id).content;
    if (text === '') {
      return toast.error('Nothing to download!', {
        position: 'top-right',
      })
    } else {
      updateNote(id);
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
    const text = notes.find((note: any) => note.id === id).content;
    if (text === '') {
      return toast.error('Nothing to copy!', {
        position: 'top-right',
      })
    } else {
      updateNote(id);
      navigator.clipboard.writeText(text);
      toast.success('Note Copied to clipboard!', {
        position: 'top-right',
      })
    }
  };

  const formatDate = (value: any) => {
    if (!value) return "";

    const date = new Date(value);
    const monthNames = [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];

    const dayNames = [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
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

  const handleAddNote = () => {
    const newNote = {
      id: nanoid(20),
      content: '',
      wordCount: 0,
      characterCount: 0,
      time: Date.now(),
      author: appName,
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
    toast.success('New note added!', {
      position: 'top-right',
    });
    localStorage.setItem('kNotes', JSON.stringify(newNotes));
    axios.post(`${BASE_API}/notes`, newNote);
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
        const updatedNotes = notes.filter((note: any) => note.id !== id);
        setNotes(updatedNotes);
        if (notes.length === 1) {
          localStorage.removeItem('kNotes');
        } else {
          localStorage.setItem('kNotes', JSON.stringify(updatedNotes));
        }
        axios.delete(`${BASE_API}/note?id=${id}`);
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
    if (notes.find((note: any) => note.id === id).content === '') {
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
          const updatedNotes = notes.map((note: any) => {
            if (note.id === id) {
              note.content = '';
              note.wordCount = 0;
              note.characterCount = 0;
            }
            return note;
          });
          updateNote(id);
          setNotes(updatedNotes);
          localStorage.setItem('kNotes', JSON.stringify(updatedNotes));
          toast.success('Note cleared!', {
            position: 'top-right',
          })
        }
      })
    }
  };

  const handleNoteChange = (id: any, content: any) => {
    const updatedNotes = notes.map((note: any) => {
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
    localStorage.setItem('kNotes', JSON.stringify(updatedNotes));
  };

  const handleFontSize = (size: any) => {
    const updatedSetting = { ...setting, fontSize: size };
    setSetting(updatedSetting);

    localStorage.setItem('kNotesSetting', JSON.stringify(updatedSetting));
  };

  const handleFontWeight = (type: any) => {
    const updatedSetting = { ...setting, fontWeight: type };
    setSetting(updatedSetting);

    localStorage.setItem('kNotesSetting', JSON.stringify(updatedSetting));
  };

  const handleFontColor = (type: any) => {
    const updatedSetting = { ...setting, fontColor: type };
    setSetting(updatedSetting);

    localStorage.setItem('kNotesSetting', JSON.stringify(updatedSetting));
  };

  const handleShowCharWord = (boolean: any) => {
    const updatedSetting = { ...setting, showCharWord: boolean };
    setSetting(updatedSetting);

    localStorage.setItem('kNotesSetting', JSON.stringify(updatedSetting));
  }

  const handleShareNote = (id: any) => {
    if (notes.find((note: any) => note.id === id).content === '') {
      return toast.error('Nothing to share!', {
        position: 'top-right',
      })
    }
    const slug = id;
    const shareUrl = window.location.href + 'note/' + slug;
    Swal.fire({
      text: 'Share this note?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Copy Link',
      cancelButtonText: 'Cancel',
    }).then((result: any) => {
      if (result.isConfirmed) {
        updateNote(id);
        if (!navigator.clipboard) {
          return toast.error('Clipboard not supported!', {
            position: 'top-center',
          })
        } else {
          navigator.clipboard.writeText(shareUrl);
        }
        Swal.fire({
          title: 'Copied!',
          text: 'Shareable link copied to clipboard.',
          icon: 'success',
          timer: 1000,
          showConfirmButton: false,
        })
      }
    })
  }

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be signed out from this account.",
      icon: "warning",
      showCancelButton: true,
      background: "#fff",
      color: "#333",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, sign out!",
    }).then((result: any) => {
      if (result.isConfirmed) {
        // sign out from firebase
        signOut(auth).then(() => {
          localStorage.removeItem("accessToken");
          toast.success(`Thank you, ${user?.displayName} to stay with us!`, {
            position: "top-center",
          });
        }).catch((err) => {
          // toast for error
          toast(err.message, {
            icon: '👎',
          })
        })
      }
    })
  };

  return (
    <div className="lg:container px-8 mx-auto py-8">
      {user && (
        <div className="flex justify-center items-center fixed top-4 right-4 rounded-xl px-1 lg:px-2 lg:py-1 z-50 glass bg-gradient-to-tl from-[#cf9aff] to-[#95c0ff]">
          <div className="flex justify-center items-center gap-2">
            <h2 className="text-white text-sm md:text-md">Hi, {auth?.currentUser?.displayName?.split(' ').slice(0, -1).join(' ')}!</h2>
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar"
              >
                <div
                  style={{ display: "grid" }}
                  className="w-8 h-8 lg:w-10 lg:h-10 rounded-full border bg-base-300 grid place-items-center ring ring-primary ring-offset-base-100 ring-offset-2"
                >
                  <img
                    src={auth?.currentUser?.photoURL as string}
                    alt="profile"
                    className="w-full h-full rounded-full"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow-xl menu menu-compact dropdown-content glass bg-gradient-to-br from-[#cf9aff] to-[#95c0ff] text-white rounded-box w-72"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto my-4 border ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={auth?.currentUser?.photoURL as string}
                    alt="profile"
                    className="w-full h-full rounded-full"
                  />
                </div>
                <div className="text-center mb-4">
                  <h2 className="font-semibold text-lg">
                    {auth?.currentUser?.displayName}
                  </h2>

                  <p className="text-xs">
                    User ID: <span className="font-semibold">USER-{auth?.currentUser?.uid?.slice(0, 6)}</span>
                  </p>
                </div>
                <hr className="font-semibold" />
                {
                  user.email === "toufiqhasankiron2@gmail.com" && (
                    <>
                      <li className="py-1 font-semibold">
                        <NavLink
                          className={({ isActive }) =>
                            isActive ? "text-white bg-primary" : ""
                          }
                          to="/adminDash"
                        >
                          <i className="bx bxs-dashboard"></i> Dashboard
                        </NavLink>
                      </li>
                    </>
                  )
                }
                <li className="py-1">
                  <button
                    onClick={handleLogOut}
                    className="font-semibold text-red-500"
                  >
                    <i className="bx bx-log-out font-semibold"></i>
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      <Link to="/">
        <h1 className="text-2xl md:text-4xl lg:text-5xl select-none font-bold mb-4 text-center text-white flex md:justify-center items-center gap-1"><img src={NoteImg} className='w-10 md:w-12' alt="" />{appName}</h1>
      </Link>
      <div className="flex md:justify-center items-center my-6 md:my-10 gap-3">
        <button
          className="glass uppercase font-semibold bg-gradient-to-bl md:bg-gradient-to-tl from-[#cf9aff] to-[#95c0ff] text-white py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
          onClick={handleAddNote}
        >
          Add Note
        </button>
        <label htmlFor="settingModal" className='cursor-pointer'>
          <p className="glass bg-gradient-to-tr md:bg-gradient-to-bl from-[#cf9aff] to-[#95c0ff] text-white py-3 px-4 rounded-xl uppercase font-semibold -mt-1 focus:outline-none focus:shadow-outline">
            <AiOutlineSetting />
          </p>
        </label>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        {notes.slice().reverse().map((note: any) => (
          <div key={note.id} className="mb-4">
            <div className="flex justify-end items-center text-end">
              <span className={`text-white select-none glass rounded-tl-3xl rounded-tr-xl ${setting.showCharWord ? 'p-1 text-xs px-3.5' : 'p-3 text-sm'} mb-[.15rem]`}>
                {formatDate(note.time)} {
                  setting.showCharWord === 'true' && (
                    <>
                      <br /> {note.characterCount} character(s), {note.wordCount} word(s)
                    </>
                  )
                }
              </span>
            </div>
            <textarea
              className={`textarea focus:outline-none rounded-tl-xl rounded-br-xl placeholder:text-white glass rounded-none p-4 w-full`}
              style={{ minHeight: "250px", resize: "none", fontSize: `${setting.fontSize}px`, fontWeight: `${setting.fontWeight}`, color: `${setting.fontColor}` }}
              value={note.content}
              placeholder="Type your note here..."
              onChange={(e) => handleNoteChange(note.id, e.target.value)}
            />
            <div className='flex justify-start items-center gap-1'>
              <span className='tooltip' data-tip="Delete Note">
                <button
                  className="glass bg-gradient-to-tl md:bg-gradient-to-br from-[#cf9aff] to-[#95c0ff] text-white py-3 px-4 rounded-xl rounded-tl-none rounded-tr-none rounded-br-none uppercase font-semibold -mt-1 focus:outline-none focus:shadow-outline"
                  onClick={() => handleDeleteNote(note.id)}>
                  <FiTrash />
                </button>
              </span>
              <span className='tooltip' data-tip="Copy Note">
                <button
                  className="glass bg-gradient-to-br md:bg-gradient-to-tl to-[#95c0ff] from-[#cf9aff] text-white py-3 px-4 rounded-none uppercase font-semibold -mt-1 focus:outline-none focus:shadow-outline"
                  onClick={() => handleCopyToClipboard(note.id)}>
                  <FiClipboard />
                </button>
              </span>
              <span className='tooltip' data-tip="Clear Note">
                <button
                  className="glass bg-gradient-to-tl md:bg-gradient-to-br from-[#cf9aff] to-[#95c0ff] text-white py-3 px-4 rounded-none uppercase font-semibold -mt-1 focus:outline-none focus:shadow-outline"
                  onClick={() => handleClearNote(note.id)}>
                  <RxReset />
                </button>
              </span>
              <span className='tooltip' data-tip="Download Note">
                <button
                  className="glass bg-gradient-to-br md:bg-gradient-to-tl to-[#95c0ff] from-[#cf9aff] text-white py-3 px-4 rounded-none uppercase font-semibold -mt-1 focus:outline-none focus:shadow-outline"
                  onClick={() => handleDownload(note.id)}>
                  <FiDownload />
                </button>
              </span>
              <span className='tooltip' data-tip="Share Note">
                <button
                  className="glass bg-gradient-to-br md:bg-gradient-to-tl to-[#95c0ff] from-[#cf9aff] text-white py-3 px-4 rounded-xl rounded-tl-none rounded-tr-none rounded-bl-none uppercase font-semibold -mt-1 focus:outline-none focus:shadow-outline"
                  onClick={() => handleShareNote(note.id)}>
                  <FiShare2 />
                </button>
              </span>
            </div>
            <SettingModal setting={setting} handleFontSize={handleFontSize} handleFontWeight={handleFontWeight} handleFontColor={handleFontColor} handleShowCharWord={handleShowCharWord} />
          </div>
        ))}
      </div>
    </div>
  )
}
