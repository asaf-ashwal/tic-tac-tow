import React, {useContext} from "react";
import style from "./style.module.css";
import IconBut from "../../components/IconBut";
import MainBox from "../../components/MainBox";
import ModeSelection from "../../pages/ModeSelection";
import ChoosePlayer from "../../pages/ChoosePlayer";
import {allContext} from "../../Layout";
import { socetContext } from "../../App";

export default function index({roomId}) {
  const {io, socket, setSocket, socketIO} = useContext(socetContext);
  const {setComponent} = useContext(allContext);
   socket.on("joined", (data) => {
     setComponent(<ChoosePlayer />) 
  });
  // socket.on("continue", (data) => {
  //   console.log("lolol");
  //   setComponent(<ChoosePlayer />);
  // });
  return (
    <div className={style.main}>
      <div className={style.reternButten}>
        <IconBut
          icon={"retern"}
          hendaleClick={() => setComponent(<ModeSelection />)}
        />
      </div>
      <div className={style.cener}>
        <div className={style.codeDiv}>
          <MainBox title={"your code"} lost={true} x_o={"x"}>
            {<p className={style.code}>{roomId}</p>}
          </MainBox>
        </div>
        <div className={style.waitingDiv}>
          <div className={style.waitingIcon}></div>
          <p className={style.waitingText}>waiting for opponent</p>
        </div>
      </div>
    </div>
  );
}
