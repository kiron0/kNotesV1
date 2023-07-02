import React, { useContext } from "react";
import LOGO from "../../../assets/notes.png";
import { MdSpaceDashboard } from "react-icons/md";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AppName } from "../../../AppName";
import { FiTrash } from "react-icons/fi";
import { InitializeContext } from "../../../App";

export default function Dashboard() {
          const { formatDate, notesV2, addNewNote, handleDeleteNote } = useContext(InitializeContext);
          return (
                    <div className="drawer lg:drawer-open">
                              <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />
                              <div className="drawer-content p-3 md:p-3">
                                        <div className="header glass z-50 sticky top-3 flex justify-between items-center shadow-lg p-4 rounded-xl h-20">
                                                  <label
                                                            htmlFor="dashboard-sidebar"
                                                            className="btn btn-outline btn-primary border-primary drawer-button lg:hidden text-black"
                                                  >
                                                            <MdSpaceDashboard className="text-2xl text-black hover:text-white" />
                                                  </label>
                                                  <div className="flex items-center gap-1 text-black">
                                                            <h1 className="text-lg md:text-2xl font-semibold hidden md:flex">
                                                                      Welcome to
                                                            </h1>
                                                            <Link
                                                                      to="/"
                                                                      className="text-xl md:text-2xl font-semibold"
                                                            >
                                                                      <span className="md:text-primary">{AppName}</span> <span className='text-xs md:text-base'> - a simple note taking app</span>
                                                            </Link>
                                                  </div>
                                                  <div className="dropdown dropdown-end"></div>
                                        </div>
                                        <Outlet />
                              </div>
                              <div className="drawer-side shadow-xl z-50">
                                        <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label>
                                        <ul className={`menu p-4 overflow-y-auto overflow-x-hidden ${notesV2.length >= 5 ? '' : 'h-full'} w-80 md:w-96 bg-base-100 text-base-content glass bg-gradient-to-tl from-[#cf9aff] to-[#95c0ff]`}>
                                                  <div className="flex flex-col items-center gap-3 text-2xl p-2 border-b pb-5">
                                                            <Link
                                                                      to="/v2"
                                                                      className="logo font-semibold text-center flex items-center flex-col gap-2 text-white"
                                                            >
                                                                      <img src={LOGO} alt="" className="w-16" /> {AppName}
                                                                      <small className="text-sm text-white">
                                                                                A Notepad Web App
                                                                      </small>
                                                            </Link>
                                                  </div>
                                                  <div className="flex justify-center items-center my-4">
                                                            <button
                                                                      className="glass uppercase font-semibold bg-gradient-to-br md:bg-gradient-to-tl from-[#cf9aff] to-[#95c0ff] text-white py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
                                                                      onClick={addNewNote}
                                                            >
                                                                      Add Note
                                                            </button>
                                                  </div>
                                                  {
                                                            notesV2.slice().reverse().map((note: any) => (
                                                                      <NavLink className={({ isActive }) =>
                                                                                isActive ? "my-2 glass rounded-xl select-none cursor-pointer py-6 bg-primary text-white transition duration-300 ease-in-out" : "my-2 glass select-none rounded-xl cursor-pointer py-6 hover:bg-white hover:bg-opacity-10 transition duration-300 ease-in-out"
                                                                      }
                                                                                key={note.id}
                                                                                to={`/v2/notes/${note.id}`}
                                                                      >
                                                                                <span className='absolute top-2 right-1'>
                                                                                          <button
                                                                                                    className="glass bg-gradient-to-tl md:bg-gradient-to-br from-[#cf9aff] to-[#95c0ff] text-white py-2 px-3 rounded-xl rounded-tl-none rounded-tr-xl rounded-br-none uppercase font-semibold -mt-1 focus:outline-none focus:shadow-outline"
                                                                                                    onClick={() => handleDeleteNote(note.id)}
                                                                                          >
                                                                                                    <FiTrash />
                                                                                          </button>
                                                                                </span>
                                                                                <p className={`flex flex-col items-start px-3`}>
                                                                                          <span className="text-lg font-bold">{note?.title?.length > 15 ? note?.title?.slice(0, 15) + '...' : note.title || 'Untitled Note'}</span>
                                                                                          <span className="text-sm font-semibold">{note?.content?.length > 30 ? note?.content?.slice(0, 30) + '...' : note.content || 'Untitled Note'}</span>
                                                                                </p>
                                                                                <p className="flex justify-end items-end pr-3 pt-4">
                                                                                          <span className="text-xs font-semibold">{formatDate(note?.time)}</span>
                                                                                </p>
                                                                      </NavLink>
                                                            ))
                                                  }
                                        </ul>
                              </div>
                    </div>
          );
};
