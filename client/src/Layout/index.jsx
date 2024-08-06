import React, {createContext, useContext, useState} from "react";
import style from "./style.module.css";
import Login from "../pages/Login";
import ChoosePlayer from "../pages/ChoosePlayer";
// import ChoosePlayer from "../pages/ChoosePlayer";

export const allContext = createContext("");
export default function Layout() {

//  TO DO // SOCET ON SERVER // CREAT A ROOM // FIX THE PLAYERS AND PLAYERS TURNS

  // const [component, setComponent] = useState(<Login />);
  const [component, setComponent] = useState(<Login />);
  const [userInfo, setUserInfo] = useState({imag:1});

  return (
    <allContext.Provider
      value={{component, setComponent, userInfo, setUserInfo}}
    >
      {false ? <ChoosePlayer /> : component}
    </allContext.Provider>
  );
}
