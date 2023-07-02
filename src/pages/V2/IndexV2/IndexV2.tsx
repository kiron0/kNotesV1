import React from 'react'
import useScrollToTop from "../../../hooks/useScrollToTop";
import useTitle from '../../../hooks/useTitle';
import { AppName } from '../../../AppName';

export default function IndexV2() {
          useTitle("Welcome")
          useScrollToTop();
          return (
                    <div className="flex justify-center items-center h-screen">
                              <div className="lg:flex lg:mx-auto">
                                        <h2 className="md:text-3xl text-center text-white px-3 md:px-0">
                                                  Welcome To <span className='text-primary font-semibold'>{AppName}</span>
                                                  <span className='text-base'> - a simple note taking app</span>
                                        </h2>
                              </div>
                    </div>
          );
};

