import React, { useContext } from "react";
import style from "./style.module.css";
import OpshensBut from "../../components/OpshensBut";
import IconBut from "../../components/IconBut";
import {allContext} from "../../Layout";
import JoinGame from "../../pages/JoinGame";
import Login from "../../pages/Login";
import { socetContext } from "../../App";

export default function index() {
  const {userInfo, setUserInfo, setComponent} = useContext(allContext);
  const {socket} = useContext(socetContext);
  const hendaleClick = async () => {
    await socket.emit("user", userInfo);
     setComponent(<JoinGame />);
 
   };
  return (
    <div className={style.main}>
      <div className={style.logo}>
        <img src="../../../public/Logo.png" alt="" />
      </div>
      <div className={style.buttens}>
        <div className={style.but}>
          <OpshensBut text={"play solo"} />
        </div>
        <div className={style.but}>
          <OpshensBut text={"play with friend"} 
            hendaleClick={hendaleClick}
            />
        </div>
      </div>
      <div className={style.buttenDef}>
        <IconBut icon={"definitine"}
                  hendaleClick={() => setComponent(<Login />)}

        />
      </div>
    </div>
  );
}
