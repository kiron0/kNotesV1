import React, { useState, useEffect, useContext } from 'react'
import NoteImg from '../../assets/notes.png'
import { Link, useParams } from 'react-router-dom';
import Footer from '../../shared/Footer/Footer';
import axios from 'axios';
import { BASE_API } from '../../config';
import { FiClipboard, FiDownload } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { InitializeContext } from '../../App';

export default function Note() {
          const { id } = useParams();
          const { appName } = useContext(InitializeContext);
          const [note, setNote] = useState({} as any);
          const [loading, setLoading] = useState<boolean>(false);

          useEffect(() => {
                    if (id?.length !== 20) return setLoading(true);
                    axios.get(`${BASE_API}/note?id=${id}`)
                              .then(res => {
                                        const note = res.data;
                                        if (note.content === undefined) return setLoading(true);
                                        if (id?.length === 20 && note.content === '') return setLoading(true)
                                        setNote(note);
                                        setLoading(false);
                              }).catch(err => {
                                        setLoading(true);
                                        console.log(err);
                              })
          }, [id]);

          useEffect(() => {
                    const title = note.content?.slice(0, 15);
                    document.title = `${title ? title : 'Untitled'} - ${appName} | Notepad Web App`;
          }, [note, appName]);

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

          const handleDownload = () => {
                    const text = note.content;
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

          const handleCopyToClipboard = () => {
                    const text = note.content;
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

          if (loading) {
                    return (
                              <main className="h-screen select-none flex flex-col justify-center items-center">
                                        <h1 className="text-9xl font-extrabold tracking-widest">404</h1>
                                        <div className="bg-gradient-to-bl md:bg-gradient-to-tl from-[#cf9aff] to-[#95c0ff] glass text-white px-2 text-sm rounded rotate-12 absolute">
                                                  Sorry, Link is invalid
                                        </div>
                                        <Link to="/">
                                                  <button
                                                            className="mt-5 glass text-sm md:text-md uppercase font-semibold bg-gradient-to-bl md:bg-gradient-to-tl from-[#cf9aff] to-[#95c0ff] text-white py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"
                                                  >
                                                            Go to Home
                                                  </button>
                                        </Link>
                              </main>
                    )
          } else {
                    return (
                              <>
                                        <div className="lg:container px-8 mx-auto py-8">
                                                  <Link to="/">
                                                            <h1 className="text-2xl md:text-4xl lg:text-5xl select-none font-bold mb-4 text-center text-white flex md:justify-center items-center gap-1"><img src={NoteImg} className='w-10 md:w-12' alt="" />{appName}</h1>
                                                  </Link>
                                                  <div className='flex justify-center items-center pt-5'>
                                                            <button
                                                                      className="text-sm md:text-md glass uppercase cursor-default no-animation font-semibold bg-gradient-to-bl md:bg-gradient-to-tl from-[#cf9aff] to-[#95c0ff] text-white py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"

                                                            >
                                                                      Thanks for using {appName}! <br />
                                                                      & <span className='font-bold'>Thanks for sharing this with your friends!</span>
                                                            </button>
                                                  </div>
                                                  <div className='w-full md:w-1/2 lg:w-1/3 mx-auto pt-8 md:pt-20'>
                                                            <div className="mb-4">
                                                                      <div className="flex justify-end items-center text-end">
                                                                                <span className={`text-white select-none glass rounded-tl-3xl rounded-tr-xl p-2 text-xs mb-[.15rem]`}>
                                                                                          {formatDate(note?.time)} <br /> {note?.characterCount} character(s), {note?.wordCount} word(s)
                                                                                </span>
                                                                      </div>
                                                                      <textarea className={`textarea focus:outline-none rounded-tl-xl h-[250px] rounded-br-xl rounded-bl-none glass rounded-none p-3 w-full select-none cursor-not-allowed hide-cursor`}
                                                                                style={{ minHeight: "250px", resize: "none" }}
                                                                                onMouseDown={(e) => {
                                                                                          e.preventDefault()
                                                                                          toast.error("You can't copy text!", {
                                                                                                    position: 'bottom-right',
                                                                                          })
                                                                                }}
                                                                                onSelect={(e) => e.preventDefault()}
                                                                                onContextMenu={(e) => e.preventDefault()}
                                                                                onDoubleClick={(e) => e.preventDefault()}
                                                                                readOnly
                                                                                value={note?.content}
                                                                      />
                                                                      <div className='flex justify-start items-center gap-1'>
                                                                                <span className='tooltip' data-tip="Copy Note">
                                                                                          <button
                                                                                                    className="glass bg-gradient-to-tl md:bg-gradient-to-br from-[#cf9aff] to-[#95c0ff] text-white py-3 px-4 rounded-xl rounded-tl-none rounded-tr-none rounded-br-none uppercase font-semibold -mt-1 focus:outline-none focus:shadow-outline"
                                                                                                    onClick={handleCopyToClipboard}>
                                                                                                    <FiClipboard />
                                                                                          </button>
                                                                                </span>
                                                                                <span className='tooltip' data-tip="Download Note">
                                                                                          <button
                                                                                                    className="glass bg-gradient-to-br md:bg-gradient-to-tl to-[#95c0ff] from-[#cf9aff] text-white py-3 px-4 rounded-xl rounded-tl-none rounded-tr-none rounded-bl-none uppercase font-semibold -mt-1 focus:outline-none focus:shadow-outline"
                                                                                                    onClick={handleDownload}>
                                                                                                    <FiDownload />
                                                                                          </button>
                                                                                </span>
                                                                      </div>
                                                            </div>
                                                  </div>
                                        </div>
                                        <Footer />
                              </>
                    )
          }
}
