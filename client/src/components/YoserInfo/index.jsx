import React from "react";
import style from "./style.module.css";

// need to get  name={"moshe"} imag={img} wins={"12"} myTurn={true} x_o={"o"}

export default function index({name, imag, wins, myTurn, x_o}) {
  //   TO DO // ADD REAL  O - X  //

  return (
    <div className={style.main}>
      <div className={style.toFlex}>
        <p>{x_o}</p>
        <div className={`${style.p} ${myTurn && style.winsMyTurn}`}>
          <div className=""> wins: {wins}</div>
          <img
            className={`${style.img} ${myTurn && style.myTurn}`}
            src={imag}
            alt=""
          />
        </div>
      </div>
      <div className={style.name}>{name}</div>
      {/* <div className={
              
        </div> 
      <div className=""></div> */}
    </div>
  );
}
