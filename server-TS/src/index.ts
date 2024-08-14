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


io.on('connection', (socket) => {
    let theSocket = ''
    theSocket = socket.id;
    console.log(theSocket);


    // add player || WORKS !!!
    socket.on("addNewUser", async (data) => {
        func.addNewUser(data, theSocket).then((result) => {
            socket.emit('userAdded', result);
        })
    });



    // Create mark in room || WORKS !!!
    socket.on("chooseMark", async (data) => {
        // console.log(data);

        func.addMark(data, theSocket).then((result) => {
            io.emit('startGame', result);
        })
    });

    // Create room and returen roomId || WORKS !!!
    socket.on("createRoom", async (data) => {
        func.createRoom(theSocket)
            .then((result) => {
                socket.emit('roomId', result);
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





    socket.on('readyToGetGameData', () => {
        let result = func.getStartGameData(theSocket)
        socket.emit('getGmaeStartData', result)
    });

    socket.on('updateIndex', (data) => {
        let res = func.dataAdder(data.index, theSocket)
        console.log(res);

        if (res.wins) {
            io.emit('winsArr', res.wins)
        }
        io.emit('getUpdatedIndex', res)

        // io.emit('chat message', msg); // שולח את ההודעה לכל הלקוחות
    });



});

const PORT = 3999;
server.listen(PORT, () => {
    console.log(`Server is running on PORT || ${PORT}`);
});


// import ItemRouter from './routes/ItemRouter'
// app.use('/item',ItemRouter)
