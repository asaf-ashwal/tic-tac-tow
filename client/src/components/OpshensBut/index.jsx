import React from 'react'
import style from './style.module.css'
export default function index({text,hendaleClick}) {
  // TO DO // BORDER TEXT 
  return (
    <button onClick={hendaleClick} className={style.main} >{text}</button>
  )
}

