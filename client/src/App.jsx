import {createContext, useState} from "react";
import Test from "./Test";
import Layout from "./Layout";
import "./App.css";
import {io} from "socket.io-client";
const socketIO = io();
export const socetContext = createContext();


function App() {
  const [socket, setSocket] = useState(socketIO);
  // const [userInfo, setUserInfo] = useState({});
  return (
    <>
      <main>
        <socetContext.Provider
          value={{ io, socket, setSocket, socketIO}}
        >
          <Layout />
        </socetContext.Provider>
        {/* <Test /> */}
      </main>
    </>
  );
}

export default App;
