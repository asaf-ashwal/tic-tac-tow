"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const func_1 = __importDefault(require("./functions/func"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const server = http_1.default.createServer(app);
// io
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*'
    }
});
// // טיפול בחיבורים של Socket.io
let theSocket = '';
console.log(theSocket);
io.on('connection', (socket) => {
    theSocket = socket.id;
    // add player || WORKS !!!
    socket.on("addNewUser", async (data) => {
        func_1.default.addNewUser(data, theSocket).then((result) => {
            io.emit('userAdded', result);
        });
    });
    // Create mark in room || WORKS !!!
    socket.on("chooseMark", async (data) => {
        func_1.default.addMark(data, theSocket).then((result) => {
            io.emit('startGame', result);
        });
    });
    // Create room and returen roomId || WORKS !!!
    socket.on("createRoom", async (data) => {
        console.log('הגיע לפה');
        func_1.default.createRoom(theSocket)
            .then((result) => {
            io.emit('roomId', result);
        });
    });
    // Second player joined || WORKS !!!
    socket.on("tryToJoin", async (data) => {
        console.log(data, theSocket);
        func_1.default.handleJoin(data, theSocket)
            .then((result) => {
            io.emit('joined', result);
            // io.emit('continue', true);
        });
    });
    socket.on('chat message', (msg) => {
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
