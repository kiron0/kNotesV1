import React, { useState, useEffect } from 'react'
import NoteImg from '../../assets/notes.png'
import { FiTrash, FiDownload, FiClipboard, FiTrash2 } from 'react-icons/fi'
import Swal from 'sweetalert2';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Notes() {
  const [notes, setNotes] = useState(localStorage.getItem('kNotes') ? JSON.parse(localStorage.getItem('kNotes') as any) : []);

  useEffect(() => {
    if (notes.length === 0) {
      const newNote = {
        id: Date.now() + "" + Math.floor(Math.random() * 78),
        content: '',
        wordCount: 0,
        characterCount: 0,
        time: Date.now(),
      };
      const newNotes = [...notes, newNote];
      setNotes(newNotes);
      localStorage.setItem('kNotes', JSON.stringify(newNotes));
    }
  }, [notes]);

  const handleDownload = (id: any) => {
    const text = notes.find((note: any) => note.id === id).content;
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
    const text = notes.find((note: any) => note.id === id).content;
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
      id: Date.now() + "" + Math.floor(Math.random() * 78),
      content: '',
      wordCount: 0,
      characterCount: 0,
      time: Date.now(),
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
    toast.success('New note added!', {
      position: 'top-right',
    });
    localStorage.setItem('kNotes', JSON.stringify(newNotes));
  };

  const handleDeleteNote = (id: any) => {
    Swal.fire({
      text: 'Are you sure to delete?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedNotes = notes.filter((note: any) => note.id !== id);
        setNotes(updatedNotes);

        if (notes.length === 1) {
          localStorage.removeItem('kNotes');
        } else {
          localStorage.setItem('kNotes', JSON.stringify(updatedNotes));
        }

        Swal.fire({
          title: 'Deleted!',
          text: 'Your note has been deleted.',
          icon: 'success',
          timer: 1000,
          showConfirmButton: false,
        })
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
      }).then((result) => {
        if (result.isConfirmed) {
          const updatedNotes = notes.map((note: any) => {
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

  return (
    <div className="lg:container px-8 mx-auto py-8">
      <Link to="/">
        <h1 className="text-2xl md:text-4xl lg:text-5xl select-none font-bold mb-4 text-center text-white flex md:justify-center items-center gap-1"><img src={NoteImg} className='w-10 md:w-12' alt="" />KNotes</h1>
      </Link>
      {/* <div>
        <p className='text-white select-none w-full md:w-2/3 lg:w-1/2 md:text-center mx-auto'>Welcome! This is a Progressive Notepad Web App</p>
        <p className='text-white select-none w-full md:w-2/3 lg:w-1/2 md:text-center mx-auto mt-5'>The app serves the following features:</p>

        <ul className='text-white select-none w-full md:w-2/3 lg:w-1/2 md:text-center mx-auto mt-5'>
          <li>- Write notes which are then saved to the localStorage.</li>
          <li>- Privacy-focused - We'll never collect your precious data.</li>
          <li>- Lightweight - Loads almost instantly.</li>
        </ul>

        <p className='text-white select-none w-full md:w-2/3 lg:w-1/2 md:text-center mt-5 mx-auto'>
          <span className='font-semibold'>CAUTION: </span>Since the app uses the browser's localStorage to store your notes,
          it's recommended that you take a backup of your messages more often using the
          "Download Notes" button.
        </p>
      </div> */}
      <div className="flex md:justify-center items-center my-6 md:my-10">
        <button
          className="glass uppercase font-semibold bg-gradient-to-bl md:bg-gradient-to-tl from-[#cf9aff] to-[#95c0ff] text-white py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
          onClick={handleAddNote}
        >
          Add Note
        </button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
        {notes.slice().reverse().map((note: any) => (
          <div key={note.id} className="mb-4">
            <div className="flex justify-end items-center">
              <span className="text-sm text-white select-none glass rounded-tl-3xl rounded-tr-xl p-2 mb-[.15rem]">
                {formatDate(note.time)}
              </span>
            </div>
            <textarea
              className={`textarea focus:outline-none rounded-tl-xl rounded-br-xl placeholder:text-white glass rounded-none p-4 w-full relative`}
              style={{ minHeight: "250px", resize: "none" }}
              value={note.content}
              placeholder="Type your note here..."
              onChange={(e) => handleNoteChange(note.id, e.target.value)}
            />
            <p className='mb-3'>
              <small className="text-white rounded-br-xl select-none glass p-2">
                {note.characterCount} character(s), {note.wordCount} word(s)
              </small>
            </p>
            <button
              className="glass bg-gradient-to-tl md:bg-gradient-to-br from-[#cf9aff] to-[#95c0ff] text-white py-3 px-4 rounded-xl rounded-tl-none rounded-tr-none rounded-br-none uppercase font-semibold -mt-1 focus:outline-none focus:shadow-outline"
              onClick={() => handleDeleteNote(note.id)}>
              <FiTrash />
            </button>
            <button
              className="glass bg-gradient-to-br ml-1 md:bg-gradient-to-tl to-[#95c0ff] from-[#cf9aff] text-white py-3 px-4 rounded-none uppercase font-semibold -mt-1 focus:outline-none focus:shadow-outline"
              onClick={() => handleCopyToClipboard(note.id)}>
              <FiClipboard />
            </button>
            <button
              className="glass bg-gradient-to-tl ml-1 md:bg-gradient-to-br from-[#cf9aff] to-[#95c0ff] text-white py-3 px-4 rounded-none uppercase font-semibold -mt-1 focus:outline-none focus:shadow-outline"
              onClick={() => handleClearNote(note.id)}>
              <FiTrash2 />
            </button>
            <button
              className="glass bg-gradient-to-br ml-1 md:bg-gradient-to-tl to-[#95c0ff] from-[#cf9aff] text-white py-3 px-4 rounded-xl rounded-tl-none rounded-tr-none rounded-bl-none uppercase font-semibold -mt-1 focus:outline-none focus:shadow-outline"
              onClick={() => handleDownload(note.id)}>
              <FiDownload />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
