import React from 'react'
import style from './style.module.css'


export default function index({icon,hendaleClick}) {
    
    // TO DO // TO TRY WITH ICON
    
  return (
    <button onClick={hendaleClick} className={style.main}>{icon}</button>
  )
}
