import React, {useContext, useEffect, useState} from "react";
import style from "./style.module.css";
import YoserInfo from "../../components/YoserInfo";
import MainBox from "../../components/MainBox";
import Box from "../../components/Box";
import OpshensBut from "../../components/OpshensBut";
import {socetContext} from "../../App";

export default function index() {
  const [tornFlag, setTornFlag] = useState(false);
  const [myMark, setMyMark] = useState("x");
  const [scoundPlayer, setScoundPlayer] = useState(false);

  const [arr, setArr] = useState([
    {activ: false, lost: false, x_o: ""},
    {activ: false, lost: false, x_o: ""},
    {activ: false, lost: false, x_o: ""},
    {activ: false, lost: false, x_o: ""},
    {activ: false, lost: false, x_o: ""},
    {activ: false, lost: false, x_o: ""},
    {activ: false, lost: false, x_o: ""},
    {activ: false, lost: false, x_o: ""},
    {activ: false, lost: false, x_o: ""},
  ]);

  const {socket} = useContext(socetContext);

  socket.on("winsArr", (data) => {
    setTornFlag(false);
    const CurrentBoardState = [...arr];

    data.forEach((box) => {
      CurrentBoardState[box.index].x_o = box.mark;
    });

    const WinningBoxesIndexes = data.map((v) => v.index);
    CurrentBoardState.map((v, i) => {
      if (!WinningBoxesIndexes.includes(i)) CurrentBoardState[i].lost = true;
    });
    setArr(CurrentBoardState);
  });

  socket.on("getUpdatedIndex", async (data) => {
    const CurrentBoardState = [...arr];
    const newindex = {activ: false, lost: false, x_o: data.mark};

    CurrentBoardState[data.lastChoice] = newindex;

    setArr(CurrentBoardState);
    setTornFlag(!tornFlag);
  });

  socket.on("getGmaeStartData", (data) => {
    console.log(data);

    setScoundPlayer({
      img: "",
      name: data.secondPlayerData.name,
      wins: data.secondPlayerData.wins,
      mark: data.secondPlayerData.mark,
    });
    setMyMark(data.mark);
    data.mark == "x" ? setTornFlag(true) : setTornFlag(false);
  });
  let imgs = [
    "https://media.npr.org/assets/img/2011/08/17/fguy2006_stewie1_f_custom-f9251870653c8aab9ab0a47f028b281c97b6f1cb.jpg",
    "../../../public/avatar_girl.png",
  ];

  const handleClick = (index) => {
    if (tornFlag) socket.emit("updateIndex", {index});
  };
  useEffect(() => {
    socket.emit("readyToGetGameData", "a");
  }, []);
  return (
    <div className={style.main}>
      <div className={style.header}>
        <YoserInfo
          name={"stewie"}
          imag={imgs[0]}
          wins={"12"}
          myTurn={tornFlag}
          x_o={myMark}
        />
        <YoserInfo
          name={scoundPlayer.name}
          imag={imgs[1]}
          wins={scoundPlayer.wins}
          myTurn={!tornFlag}
          x_o={scoundPlayer.mark}
        />
      </div>
      <div className={style.bord}>
        <MainBox lost={true} x_o={"x"}>
          <div className={style.insaidBord}>
            {arr.map((v, i) => (
              <div key={i} className={style.Box} onClick={() => handleClick(i)}>
                <Box activ={false} lost={v.lost} x_o={v.x_o} />
              </div>
            ))}
          </div>
        </MainBox>
      </div>
      {false ? (
        <>
          <div className={style.buttons}>
            <OpshensBut text={"play again"} />
          </div>
          <div className={style.buttons}>
            <OpshensBut text={"back to main"} />
          </div>
        </>
      ) : (
        <div className={style.backButton}>
          <OpshensBut text={"back"} />
        </div>
      )}
    </div>
  );
}
