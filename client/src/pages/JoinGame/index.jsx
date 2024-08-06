import React, {useContext, useState} from "react";
import style from "./style.module.css";
import IconBut from "../../components/IconBut";
import Titels from "../../components/Titels";
import MainBox from "../../components/MainBox";
import OpshensBut from "../../components/OpshensBut";
import Waiting from "../../pages/Waiting";
import ModeSelection from "../../pages/ModeSelection";

import {allContext} from "../../Layout";
import {socetContext} from "../../App";
export default function index() {
  const {userInfo, setUserInfo, setComponent} = useContext(allContext);
  const [joinCode, setJoinCode] = useState("");
  // console.log(joinCode);
  const {io, socket, setSocket, socketIO} = useContext(socetContext);

  const hendaleJoin = async () => {
    await socket.emit("tryToJoin", {joinCode, userInfo});
    await socket.on("joined", (data) => {
      data ? setComponent(<>wait</>) : console.log("Room not exist");
    });
  };

  const hendaleCreateAGame = async () => {
    console.log("here!")

    await socket.emit("createRoom",'');
    await socket.on("roomId", (data) => {
      data
        ? setComponent(<Waiting roomId={data} />):
        // :   
          console.log("create failed");
    });
  };
  //  TO DO // JOIN ON CLICK SEND A MESSAGE TO SERVER TO  CHECK IF HES ROOM WITH THAT CODE
  return (
    <div className={style.main}>
      <div className={style.reternButten}>
        <IconBut
          icon={"bla"}
          hendaleClick={() => setComponent(<ModeSelection />)}
        />
      </div>
      <div className={style.top}>
        <Titels text={"join to a game"} />
        <div className={style.inputDiv}>
          <MainBox lost={true} x_o={"x"}>
            {
              <input
                onChange={(e) => setJoinCode(e.target.value)}
                placeholder="enter code game"
              />
            }
          </MainBox>
        </div>
      </div>
      <div className={style.bottom}>
        <div className={style.joinBut}>
          <OpshensBut hendaleClick={hendaleJoin} text={"join"} />
        </div>
        <div className={style.p}>or</div>
        <div className={style.createBut}>
          <OpshensBut
            hendaleClick={hendaleCreateAGame}
            text={"create a game"}
          />
        </div>
      </div>
    </div>
  );
}
