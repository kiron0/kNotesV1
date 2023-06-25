import React, { useState, useEffect } from 'react'
import NoteImg from '../../assets/notes.png'
import { Link, useParams } from 'react-router-dom';
import { appName } from '../../AppName';
import Footer from '../../shared/Footer/Footer';

export default function Note() {
          const { id } = useParams();
          const [note, setNote] = useState({} as any);
          const [loading, setLoading] = useState<boolean>(false);

          useEffect(() => {
                    if (id?.length !== 15) return setLoading(true);
                    if (isNaN(Number(id))) return setLoading(true);
                    const notes = JSON.parse(localStorage.getItem('kNotes') || '[]');
                    const note = notes.find((note: any) => note.id === `kNotes-${id}`);
                    if (!note) return setLoading(true);
                    if (note.content === undefined) return setLoading(true);
                    setNote(note);
                    setLoading(false);
          }, [id]);

          useEffect(() => {
                    const title = note.content?.slice(0, 15);
                    document.title = `${title ? title : 'Untitled'} - ${appName} Web App`;
          }, [note]);

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

          if (loading) {
                    return (


                              <main className="h-screen select-none flex flex-col justify-center items-center">
                                        <h1 className="text-9xl font-extrabold tracking-widest">404</h1>
                                        <div className="bg-[#FF6A3D] text-white px-2 text-sm rounded rotate-12 absolute">
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
                                                                      & <span className='font-bold'>Thanks for sharing with your friends!</span>
                                                            </button>
                                                  </div>
                                                  <div className='w-full md:w-1/2 lg:w-1/3 mx-auto pt-8 md:pt-20'>
                                                            <div className="mb-4">
                                                                      <div className="flex justify-end items-center text-end">
                                                                                <span className={`text-white select-none glass rounded-tl-3xl rounded-tr-xl p-2 text-xs mb-[.15rem]`}>
                                                                                          {formatDate(note?.time)} <br /> {note?.characterCount} character(s), {note?.wordCount} word(s)
                                                                                </span>
                                                                      </div>
                                                                      <textarea
                                                                                className={`textarea focus:outline-none rounded-tl-xl rounded-br-xl rounded-bl-xl placeholder:text-white glass rounded-none p-4 w-full disabled select-none hide-cursor`}
                                                                                style={{ minHeight: "250px", resize: "none" }}
                                                                                defaultValue={note?.content}
                                                                                placeholder="Type your note here..."
                                                                      />
                                                            </div>
                                                  </div>
                                        </div>
                                        <Footer />
                              </>
                    )
          }
}
