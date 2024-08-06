import React from "react";
import style from "./style.module.css";

export default function index({children, title}) {
  return (
    <>
      <div className={style.allDiv}>
        {title && <div className={style.title}>{title}</div>}
        <div className={style.main}>{children}</div>
      </div>
    </>
  );
}
