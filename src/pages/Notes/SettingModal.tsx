import React from 'react'

export default function SettingModal({ setting, handleFontSize, handleFontWeight, handleFontColor, handleShowCharWord }: any) {
          const handleReset = (e: any) => {
                    e.preventDefault();
                    handleFontSize('14')
                    handleFontWeight('normal')
                    handleFontColor('black')
                    handleShowCharWord('true')

                    const selectFontSize = document.getElementById('selectFontSize') as HTMLSelectElement
                    selectFontSize.value = '14'
                    const selectFontWeight = document.getElementById('selectFontWeight') as HTMLSelectElement
                    selectFontWeight.value = 'normal'
                    const selectFontColor = document.getElementById('selectFontColor') as HTMLSelectElement
                    selectFontColor.value = 'black'
                    const showCharWord = document.getElementById('showCharWord') as HTMLSelectElement
                    showCharWord.value = 'true'

                    const updatedSetting = { ...setting, fontSize: '14', fontWeight: 'normal', fontColor: 'black', showCharWord: 'true' };
                    localStorage.setItem('kNotesSetting', JSON.stringify(updatedSetting));
          }

          return (
                    <div>
                              <input type="checkbox" id="settingModal" className="modal-toggle" />
                              <div className="modal modal-bottom sm:modal-middle">
                                        <div className="modal-box">
                                                  <h3 className="font-bold text-lg">Setting</h3>
                                                  <form onSubmit={handleReset}>
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
                                                                                defaultValue={setting.fontColor ? setting.fontColor : ''}
                                                                                onChange={(e) => {
                                                                                          handleFontColor(e.target.value)
                                                                                }
                                                                                }
                                                                      >
                                                                                <option value={'black'}>Default</option>
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
                                                            {/* <button className='mt-5 flex mx-auto btn btn-sm'>Reset Preferences</button> */}
                                                  </form>
                                                  <div className="modal-action">
                                                            <label htmlFor="settingModal" className="btn btn-sm">Close!</label>
                                                  </div>
                                        </div>
                              </div>
                    </div>
          )
}
