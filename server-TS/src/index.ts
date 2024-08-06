import cors from 'cors';
import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import func from './functions/func';

const app = express()
app.use(cors())
app.use(express.json())

const server = http.createServer(app);
// io
const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

// // טיפול בחיבורים של Socket.io

let theSocket = ''
console.log(theSocket);

io.on('connection', (socket) => {
    theSocket = socket.id;


    // add player || WORKS !!!
    socket.on("addNewUser", async (data) => {
        func.addNewUser(data, theSocket).then((result) => {
            io.emit('userAdded', result);
        })
    });



    // Create mark in room || WORKS !!!
    socket.on("chooseMark", async (data) => {
        func.addMark(data, theSocket).then((result) => {
            io.emit('startGame', result);
        })
    });

    // Create room and returen roomId || WORKS !!!
    socket.on("createRoom", async (data) => {
        console.log('הגיע לפה')
        func.createRoom(theSocket)
            .then((result) => {
                io.emit('roomId', result);
            })
    });


    // Second player joined || WORKS !!!
    socket.on("tryToJoin", async (data) => {
        console.log(data, theSocket)
        func.handleJoin(data, theSocket)
            .then((result) => {
                io.emit('joined', result);
                // io.emit('continue', true);
            })
    });

    socket.on('chat message', (msg: string) => {
        console.log('Message from client: ' + msg);
        io.emit('chat message', msg); // שולח את ההודעה לכל הלקוחות
    });
});

const PORT = 3999;
server.listen(PORT, () => {
    console.log(`Server is running on PORT || ${PORT}`);
});





// import ItemRouter from './routes/ItemRouter'
// app.use('/item',ItemRouter)
