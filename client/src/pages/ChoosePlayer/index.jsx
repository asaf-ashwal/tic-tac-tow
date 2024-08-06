import React, {useContext, useState} from "react";
import style from "./style.module.css";
import IconBut from "../../components/IconBut";
import MainBox from "../../components/MainBox";
import Titels from "../../components/Titels";
import Box from "../../components/Box";
import OpshensBut from "../../components/OpshensBut";
import BordWithPlayers from "../../pages/BordWithPlayers";
import ModeSelection from "../../pages/ModeSelection";
import {allContext} from "../../Layout";
import {socetContext} from "../../App";

export default function index() {
  const {userInfo, setUserInfo, setComponent} = useContext(allContext);
  const {socket} = useContext(socetContext);

  socket.on("startGame", (data) => {
    data ? setComponent(<ChoosePlayer />) : console.log("change failed");
  });
  const [showButten, setShowButten] = useState(false);
  const [theChoosen, setTheChoosen] = useState("");
  const [choose, setChoose] = useState([
    {activ: false, lost: false, x_o: "x"},
    {activ: false, lost: false, x_o: "o"},
  ]);

  const handleButtonClick = (index, x_o) => {
    setTheChoosen(x_o);
    const updatedChoose = [...choose];
    // setUserInfo({...userInfo, x_o});
    updatedChoose[index == 0 ? 1 : 0].lost = true;
    updatedChoose[index == 0 ? 0 : 1].lost = false;
    setChoose(updatedChoose);
    setShowButten(true);
  };
  const hendaleClick = () => {
    socket.emit("chooseMark", theChoosen);
    // setComponent(<BordWithPlayers />);
    // setUserInfo(...userInfo);
    console.log(theChoosen);
  };
  return (
    <div className={style.main}>
      <div className={style.reternButten}>
        <IconBut
          icon={"return"}
          hendaleClick={() => setComponent(<ModeSelection />)}
        />
      </div>
      <div className={`${style.head} ${showButten && style.headWithBut}`}>
        <Titels text={"choose player"} />
        <div className={style.chose}>
          <MainBox lost={true}>
            <div className={style.noClass}>
              {choose.map((v, i) => (
                <div
                  key={i}
                  onClick={() => handleButtonClick(i, v.x_o)}
                  className={style.chooseBox}
                >
                  <Box activ={v.activ} lost={v.lost} x_o={v.x_o} />
                </div>
              ))}
            </div>
          </MainBox>
        </div>
        {showButten && (
          <div className={style.but}>
            <OpshensBut
              hendaleClick={hendaleClick}
              icon={"next"}
              text={"Enter"}
            />
          </div>
        )}
      </div>
    </div>
  );
}
