import React from 'react'

export default function SettingModal({ setting, handleFontSize, handleFontWeight, handleFontColor, handleShowCharWord }: any) {
          return (
                    <div className=''>
                              <input type="checkbox" id="settingModal" className="modal-toggle" />
                              <div className="modal modal-bottom sm:modal-middle">
                                        <div className="modal-box bg-gradient-to-br from-[#cf9aff] to-[#95c0ff]">
                                                  <h3 className="font-bold text-lg text-white">Setting</h3>
                                                  <div>
                                                            <div className='mt-5 glass rounded-xl p-1'>
                                                                      <label className="label">
                                                                                <span className="label-text-alt">Font Size</span>
                                                                      </label>
                                                                      <select id='selectFontSize' className="select focus:outline-none w-full"
                                                                                defaultValue={setting.fontSize}
                                                                                onChange={(e) => {
                                                                                          handleFontSize(e.target.value)
                                                                                }
                                                                                }
                                                                      >
                                                                                <option value={'10'}>10</option>
                                                                                <option value={'12'}>12</option>
                                                                                <option value={'14'}>14</option>
                                                                                <option value={'16'}>16</option>
                                                                                <option value={'18'}>18</option>
                                                                                <option value={'20'}>20</option>
                                                                                <option value={'22'}>22</option>
                                                                                <option value={'24'}>24</option>
                                                                                <option value={'26'}>26</option>
                                                                      </select>
                                                            </div>
                                                            <div className='mt-5 glass rounded-xl p-1'>
                                                                      <label className="label">
                                                                                <span className="label-text-alt">Font Weight</span>
                                                                      </label>
                                                                      <select id='selectFontWeight' className="select focus:outline-none w-full"
                                                                                defaultValue={setting.fontWeight ? setting.fontWeight : ''}
                                                                                onChange={(e) => {
                                                                                          handleFontWeight(e.target.value)
                                                                                }
                                                                                }
                                                                      >
                                                                                <option value={'normal'}>Normal</option>
                                                                                <option value={'bold'}>Bold</option>
                                                                      </select>
                                                            </div>
                                                            <div className='mt-5 glass rounded-xl p-1'>
                                                                      <label className="label">
                                                                                <span className="label-text-alt">Font Color</span>
                                                                      </label>
                                                                      <select id='selectFontColor' className="select focus:outline-none w-full"
                                                                                defaultValue={setting.fontColor ? setting.fontColor : 'black'}
                                                                                onChange={(e) => {
                                                                                          handleFontColor(e.target.value)
                                                                                }
                                                                                }
                                                                      >
                                                                                <option value={'black'}>Black</option>
                                                                                <option value={'white'}>White</option>
                                                                      </select>
                                                            </div>
                                                            <div className='mt-5 glass rounded-xl p-1'>
                                                                      <label className="label">
                                                                                <span className="label-text-alt">Show character and word count</span>
                                                                      </label>
                                                                      <select id='showCharWord' className="select focus:outline-none w-full"
                                                                                defaultValue={setting.showCharWord === 'false' ? 'false' : 'true'}
                                                                                onChange={(e) => {
                                                                                          handleShowCharWord(e.target.value)
                                                                                }
                                                                                }
                                                                      >
                                                                                <option value={'true'}>Yes</option>
                                                                                <option value={'false'}>No</option>
                                                                      </select>
                                                            </div>
                                                  </div>
                                                  <div className="modal-action">
                                                            <label htmlFor="settingModal" className="btn btn-sm">Close!</label>
                                                  </div>
                                        </div>
                              </div>
                    </div>
          )
}
