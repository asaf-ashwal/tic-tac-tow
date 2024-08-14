import PlayerClass from "./classes/players"
import Rooms from "./classes/Rooms"


const players: { [key: string]: PlayerClass } = {
    // a: new PlayerClass("asaf", 5, '123456'),
    // b: new PlayerClass("ori", 1, '123456'),

}

const RoomsData: { [key: string]: Rooms } = {

}

export default { RoomsData, players }
// players['1234'] = {
//     name: 'asaf',
//     imag: 1,
//     roomId: '123456'
// }
// players['2221'] = {
//     name: 'ori',
//     imag: 1,
//     roomId: '123456'
// }
// players['2221']




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
