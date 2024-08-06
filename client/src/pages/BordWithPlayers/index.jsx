import React, {useState} from "react";
import style from "./style.module.css";
import YoserInfo from "../../components/YoserInfo";
import MainBox from "../../components/MainBox";
import Box from "../../components/Box";
import OpshensBut from "../../components/OpshensBut";

export default function index() {
  const imgs = [
    "https://media.npr.org/assets/img/2011/08/17/fguy2006_stewie1_f_custom-f9251870653c8aab9ab0a47f028b281c97b6f1cb.jpg",
    "../../../public/avatar_girl.png",
  ];
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
  const handleClick = (index) => {
    const updatedChoose = [...arr];
    updatedChoose[index].activ = true;
    updatedChoose[index].x_o = "x";
    setArr(updatedChoose);
  };
  return (
    <div className={style.main}>
      <div className={style.header}>
        <YoserInfo
          name={"stewie"}
          imag={imgs[0]}
          wins={"12"}
          myTurn={true}
          x_o={"o"}
        />
        <YoserInfo
          name={"liron"}
          imag={imgs[1]}
          wins={"2"}
          myTurn={true}
          x_o={"o"}
        />
      </div>
      <div className={style.bord}>
        <MainBox lost={true} x_o={"x"}>
          <div className={style.insaidBord}>
            {arr.map((v, i) => (
              <div key={i} className={style.Box} onClick={() => handleClick(i)}>
                <Box activ={false} lost={false} x_o={v.x_o} />
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
