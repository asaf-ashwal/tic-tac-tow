import React from 'react'
import style from './style.module.css'

export default function index({x_o,activ, lost}) {
  return (
    <button disabled={activ} className={`${style.main} ${lost && style.lost}`}>{x_o}</button>
  )
}
