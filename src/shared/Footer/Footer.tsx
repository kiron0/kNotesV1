import React from 'react'
import { BsGithub, BsLinkedin, BsTwitter } from 'react-icons/bs';
import { toast } from 'react-hot-toast';
import { AppName } from '../../AppName';
import { Link } from 'react-router-dom';

export default function Footer() {
          const handleWorkingOnFeature = () => {
                    return toast.error('Working on this feature. Please wait for the next update.')
          }
          return (
                    <div className="mx-auto text-white py-10 md:pt-16">
                              <div className="text-center">
                                        <h3 className="text-3xl mb-3 font-bold">{AppName}</h3>
                                        <p>A Notepad Web App</p>
                                        <div className="flex justify-center items-center gap-5 mt-6">
                                                  <a href='https://twitter.com/hashtagkiron' target='_blank' rel="noopener noreferrer" className="bg-white hover:bg-transparent hover:border duration-300 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none" type="button">
                                                            <BsTwitter className='text-blue-400 text-xl' />
                                                  </a>
                                                  <a href='https://linkedin.com/in/toufiq-hasan-kiron' target='_blank' rel="noopener noreferrer" className="bg-white hover:bg-transparent hover:border duration-300 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none" type="button">
                                                            <BsLinkedin className='text-blue-500 text-xl' />
                                                  </a>
                                                  <a href='https://github.com/kiron0' target='_blank' rel="noopener noreferrer" className="bg-white hover:bg-transparent hover:border duration-300 shadow-lg font-normal h-10 w-10 flex items-center justify-center rounded-full outline-none focus:outline-none" type="button">
                                                            <BsGithub className='text-black text-xl' />
                                                  </a>
                                        </div>
                              </div>
                              <div className="mt-12 flex flex-col md:flex-row justify-center items-center text-sm text-white">
                                        <span className='px-2 cursor-pointer' onClick={handleWorkingOnFeature}>Terms & Conditions</span>
                                        <span className='px-2 md:border-l cursor-pointer' onClick={handleWorkingOnFeature}>Privacy Policy</span>
                                        <span className='px-2 md:border-l cursor-pointer' onClick={handleWorkingOnFeature}>About</span>
                                        <span className='px-2 md:border-l cursor-pointer' onClick={handleWorkingOnFeature}>Contact</span>
                                        <Link to={'/v2'} className='px-2 md:border-l cursor-pointer'>Version 2</Link>
                              </div>

                              <div className='flex flex-col justify-center items-center pt-6'>
                                        <p className='text-xs md:text-sm'>Copyright &copy; {new Date().getFullYear()} <span className='font-bold'>{AppName}</span> - All Rights reserved.</p>
                                        <p className='text-xs'>Developed by <a href="https://kiron.dev" target="_blank" rel="noopener noreferrer"><span className='text-primary font-bold hover:text-white duration-500'>Toufiq Hasan Kiron</span></a></p>
                              </div>
                    </div>
          )
}
