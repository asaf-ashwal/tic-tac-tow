import React, {createContext, useContext, useState} from "react";
import img from "../../../public/Logo.png";
import style from "./style.module.css";
import MainBox from "../../components/MainBox";
import IconBut from "../../components/IconBut";
import {allContext} from "../../Layout";
import ModeSelection from "../../pages/ModeSelection";
import {socetContext} from "../../App";

export default function index() {
  const {userInfo, setUserInfo, setComponent} = useContext(allContext);
  const {io, socket, setSocket, socketIO} = useContext(socetContext);
  const handleClick = async () => {
    const newSocket = io("http://localhost:3999");
    await setSocket(newSocket);
    newSocket.emit("addNewUser", userInfo);
    newSocket.on("userAdded", (data) => {
      data ? setComponent(<ModeSelection />) : console.log("Add user failed");
    });
  };
  const images = [
    {img: "https://www.liveabout.com/thmb/fEh2NjxDt_r0QywjzksmnX6iFLQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/fGuy2006_Lois_f-56a00b003df78cafda9fc743.jpg",style:`${style.avatr}`},
    {img:"https://i.pinimg.com/564x/16/47/61/1647619316c02ec62944b68b9c97bd38.jpg",style:`${style.avatr}`},
    {img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4YxoVoMYeFk4aS-ma1Nk_YV3WReNvKlppnA6Umd3HzBxCiIAH-LiExYZ8uJREv-ng3dQ&usqp=CAU",style:`${style.avatr}`}
  ];
  const [imegesState, setImegesState] = useState(images)
  console.log(userInfo);
  return (
    <div className={style.main}>
      <div className={style.logo}>
        <img src="../../../public/Logo.png" alt="" />
      </div>
      <div className={style.yuserInfo}>
        <div className={style.inputDiv}>
          <MainBox title={"your name"} lost={true} x_o={"x"}>
            {
              <input
                onChange={(e) =>
                  setUserInfo({...userInfo, username: e.target.value})
                }
              />
            }
          </MainBox>
        </div>

        <div className={style.choseEmogiDiv}>
          <div className={style.top}>
            <p>chose avatar</p>
            <div className={style.avatars}>
              {imegesState.map((imag) => {
                let thisStile =`${style.avatr} ${style.mainAvatar}`;
                return (
                  <div key={imag.img}
                    onClick={() =>
                      (thisStile = `${style.avatr} ${style.mainAvatar}`)
                    }
                    className={imag.styleרכ}
                  >
                    <img src={imag.img} alt="" />
                  </div>
                );
              })}
            </div>
          </div>
          <div className={style.bottom}>
            <IconBut
              icon={"next"}
              // hendaleClick={() => setComponent(<JoinGame/>)} icon={"next"}
            />
            <IconBut hendaleClick={handleClick} icon={"save"} />
          </div>
        </div>
      </div>
    </div>
  );
}

+