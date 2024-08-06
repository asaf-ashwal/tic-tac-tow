import React from "react";
import style from "./style.module.css";

export default function index({text}) {
  return (
    <div className={style.main}>
      <h1>{text}</h1>
    </div>
  );
}
