import React from 'react';
import './ButtonForR&D.css'

const RnDButtons = () => {
  return(
    <div className='RnD-Container'>
      <ReviseFuncButton/>
      <DeleteFuncButton/>
    </div>
  )
}

const ReviseFuncButton = () => {
  return(
    <div>
      <button className='button-Size'>Revise Card</button>
    </div>
  )
}

const DeleteFuncButton = () => {
  return(
    <div>
      <button className='button-Size'>Delete Card</button>
    </div>
  )
}

export default RnDButtons;