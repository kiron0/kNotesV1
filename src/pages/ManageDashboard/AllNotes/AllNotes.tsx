import React from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query';
import { BASE_API } from '../../../config';
import { toast } from 'react-hot-toast';
import { FiClipboard, FiDownload, FiShare2 } from 'react-icons/fi';
import Loading from '../../../components/Loading/Loading';
import useTitle from '../../../hooks/useTitle';

export default function AllNotes() {
          useTitle("All Notes");
          const { data, isLoading } = useQuery(["allNotes"], async () => {
                    const res = await axios.get(`${BASE_API}/notes`);
                    return res?.data;
          });

          const allNotes = data;

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

          const handleDownload = (content: any) => {
                    const text = content;
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

          const handleCopyToClipboard = (content: any) => {
                    const text = content;
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

          const handleShareNote = (id: any, content: any) => {
                    if (content === '') {
                              return toast.error('Nothing to share!', {
                                        position: 'top-right',
                              })
                    }
                    const slug = id;
                    const shareUrl = window.location.origin + '/note/' + slug;
                    if (!navigator.clipboard) {
                              return toast.error('Clipboard not supported!', {
                                        position: 'top-center',
                              })
                    } else {
                              navigator.clipboard.writeText(shareUrl);
                              toast.success('Note link copied to clipboard!', {
                                        position: 'top-center',
                              })
                    }
          }

          if (isLoading) {
                    return <Loading />
          }

          return (
                    <div className='py-10'>
                              <div className='flex justify-center items-center pb-10'>
                                        <button
                                                  className="text-lg md:text-xl glass uppercase cursor-default no-animation font-bold bg-gradient-to-bl md:bg-gradient-to-tl from-[#cf9aff] to-[#95c0ff] text-white py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline"

                                        >
                                                  All Notes ({allNotes?.length}) <br /> <span className='text-sm md:text-base font-normal'>
                                                            {allNotes?.length === 0 ? "No notes found!" : "Click on a note's button to copy or download it!"}
                                                  </span>
                                        </button>
                              </div>
                              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                                        {allNotes?.slice().reverse()?.map((note: any) => (
                                                  <div className="mb-4">
                                                            {
                                                                      note?.time && (
                                                                                <div className="flex justify-end items-center text-end">
                                                                                          <span className={`text-white select-none glass rounded-tl-3xl rounded-tr-xl p-2 text-xs mb-[.15rem]`}>
                                                                                                    {formatDate(note?.time)} <br /> {note?.characterCount} character(s), {note?.wordCount} word(s)
                                                                                          </span>
                                                                                </div>
                                                                      )
                                                            }
                                                            <textarea className={`textarea focus:outline-none rounded-tl-xl h-[250px] ${note?.content === '' && 'text-xl'} rounded-br-xl rounded-bl-none glass rounded-none p-3 w-full select-none cursor-not-allowed hide-cursor`}
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
                                                                      value={note?.content ? note?.content : "No content found!"}
                                                            />
                                                            <div className='flex justify-start items-center gap-1'>
                                                                      <span className='tooltip' data-tip="Copy Note">
                                                                                <button
                                                                                          className="glass bg-gradient-to-tl md:bg-gradient-to-br from-[#cf9aff] to-[#95c0ff] text-white py-3 px-4 rounded-xl rounded-tl-none rounded-tr-none rounded-br-none uppercase font-semibold -mt-1 focus:outline-none focus:shadow-outline"
                                                                                          onClick={() => handleCopyToClipboard(note?.content)}>
                                                                                          <FiClipboard />
                                                                                </button>
                                                                      </span>
                                                                      <span className='tooltip' data-tip="Download Note">
                                                                                <button
                                                                                          className="glass bg-gradient-to-br md:bg-gradient-to-tl to-[#95c0ff] from-[#cf9aff] text-white py-3 px-4 rounded-none uppercase font-semibold -mt-1 focus:outline-none focus:shadow-outline"
                                                                                          onClick={() => handleDownload(note?.content)}>
                                                                                          <FiDownload />
                                                                                </button>
                                                                      </span>
                                                                      <span className='tooltip' data-tip="Share Note">
                                                                                <button
                                                                                          className="glass bg-gradient-to-tl md:bg-gradient-to-br to-[#95c0ff] from-[#cf9aff] text-white py-3 px-4 rounded-xl rounded-tl-none rounded-tr-none rounded-bl-none uppercase font-semibold -mt-1 focus:outline-none focus:shadow-outline"
                                                                                          onClick={() => handleShareNote(note?.id, note?.content)}>
                                                                                          <FiShare2 />
                                                                                </button>
                                                                      </span>
                                                            </div>
                                                  </div>
                                        ))}
                              </div>
                    </div>
          )
}
