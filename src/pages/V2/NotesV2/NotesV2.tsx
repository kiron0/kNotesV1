import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiTrash, FiDownload, FiClipboard } from 'react-icons/fi'
import { RxReset } from 'react-icons/rx'
import { InitializeContext } from "../../../App";
import useScrollToTop from "../../../hooks/useScrollToTop";

export default function NotesV2() {
  useScrollToTop();
  const { formatDate, handleTitleChange, handleNoteChange, notesV2, handleNoteBlur, handleDeleteNote, handleCopyToClipboard, handleClearNote, handleDownload } = useContext(InitializeContext)
  const { id } = useParams();
  const [note, setNote] = useState({} as any);
  const navigate = useNavigate();

  useEffect(() => {
    const note = notesV2.find((note: any) => note.id === id);
    if (note) {
      setNote(note);
    }
    if (!note) {
      navigate('/v2');
    }
  }, [notesV2, id, navigate]);

  return (
    <div className="h-screen">
      <div className='w-full pt-5'>
        <div key={note.id} className="mb-4">
          <div className="flex justify-end items-center text-end">
            <span className={`text-white select-none glass rounded-tl-3xl p-1 text-xs px-3.5 rounded-tr-xl mb-[.15rem]`}>
              {formatDate(note?.time)}
              <br /> {note.characterCount} character(s), {note.wordCount} word(s)
            </span>
          </div>
          <input
            value={note.title}
            onChange={(e) => handleTitleChange(note.id, e.target.value)}
            onBlur={() => handleNoteBlur(note.id)}
            placeholder="Type your title here..."
            className={`input h-16 focus:outline-none rounded-tl-xl rounded-br-none placeholder:text-black glass rounded-none p-4 w-full mb-[.1rem]`}
            type="text" />
          <textarea
            className={`textarea focus:outline-none rounded-tl-none rounded-br-xl placeholder:text-black glass rounded-none p-4 w-full`}
            style={{ minHeight: "250px", resize: "none" }}
            value={note.content}
            placeholder="Type your note here..."
            onChange={(e) => handleNoteChange(note.id, e.target.value)}
            onBlur={() => handleNoteBlur(note.id)}
          />
          <div className='flex justify-start items-center gap-1'>
            <span className='tooltip tooltip-right' data-tip="Delete Note">
              <button
                className="glass bg-gradient-to-tl md:bg-gradient-to-br from-[#cf9aff] to-[#95c0ff] text-white py-3 px-4 rounded-xl rounded-tl-none rounded-tr-none rounded-br-none uppercase font-semibold -mt-1 focus:outline-none focus:shadow-outline"
                onClick={() => handleDeleteNote(note.id)}
              >
                <FiTrash />
              </button>
            </span>
            <span className='tooltip' data-tip="Copy Note">
              <button
                className="glass bg-gradient-to-br md:bg-gradient-to-tl to-[#95c0ff] from-[#cf9aff] text-white py-3 px-4 rounded-none uppercase font-semibold -mt-1 focus:outline-none focus:shadow-outline"
                onClick={() => handleCopyToClipboard(note.id)}
              >
                <FiClipboard />
              </button>
            </span>
            <span className='tooltip' data-tip="Clear Note">
              <button
                className="glass bg-gradient-to-tl md:bg-gradient-to-br from-[#cf9aff] to-[#95c0ff] text-white py-3 px-4 rounded-none uppercase font-semibold -mt-1 focus:outline-none focus:shadow-outline"
                onClick={() => handleClearNote(note.id)}
              >
                <RxReset />
              </button>
            </span>
            <span className='tooltip' data-tip="Download Note">
              <button
                className="glass bg-gradient-to-br md:bg-gradient-to-tl to-[#95c0ff] from-[#cf9aff] text-white py-3 px-4 rounded-xl rounded-tl-none rounded-tr-none rounded-bl-none uppercase font-semibold -mt-1 focus:outline-none focus:shadow-outline"
                onClick={() => handleDownload(note.id)}
              >
                <FiDownload />
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
