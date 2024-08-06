import PlayerClass from "./classes/players"
import Rooms from "./classes/Rooms"


const players: { [key: string]: PlayerClass } = {
    a: new PlayerClass("moshe", 5),

}
const RoomsData: { [key: string]: Rooms } = {
    ['123456']: new Rooms()

}
// rooms['123456']

export default { RoomsData, players }
players['1234'] = {
    name: 'asaf',
    imag: 1,
    roomId: '123456'
} 
players['2221'] = {
    name: 'ori',
    imag: 1,
    roomId: '123456'
}
players['2221']
RoomsData['123456'].addPlayer('1234')
RoomsData['123456'].addPlayer('2221')

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
