import React from 'react'
import PageButton from './PageButton'

export const Topbar = () => {
  return (
    <div className='w-full h-10 shadow mb-2 p-2 rounded-md flex items-center justify-between'>
        <PageButton type={"button"} name={"Back"} />
        <PageButton type={"button"} name={"Add Subject"} />
    </div>
  )
}
