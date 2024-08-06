"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const players_1 = __importDefault(require("./classes/players"));
const Rooms_1 = __importDefault(require("./classes/Rooms"));
const players = {
    a: new players_1.default("moshe", 5),
};
const RoomsData = {
    ['123456']: new Rooms_1.default()
};

// rooms['123456']
exports.default = { RoomsData, players };
players['1234'] = {
    name: 'asaf',
    imag: 1,
    roomId: '123456'
};
players['2221'] = {
    name: 'ori',
    imag: 1,
    roomId: '123456'
};
players['2221'];
RoomsData['123456'].addPlayer('1234');
RoomsData['123456'].addPlayer('2221');
// let NRoom:{[key: string]: Rooms}wq589-451={
//     ['123456']: new Rooms()
// }
// // let players: { [key: string]: PlayerClass } = {
// //     a: new PlayerClass("moshe", 5),
// //     b: new PlayerClass("hanna", 2)
// // };
// // players.a.roomId = 325423
// NRoom['123456'].addPlayer("a",'x')
// NRoom['123456'].addWins("a")
// console.log(NRoom['123456'].players);
// // console.log(players.a);
// // console.log(players);
