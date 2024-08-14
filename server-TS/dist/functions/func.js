"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Rooms_1 = __importDefault(require("../classes/Rooms"));
const data_1 = __importDefault(require("../data"));
const gameSize = 3;
async function handleJoin(data, theSocket) {
    console.log(data.joinCode);
    console.log("here");
    let joinCode = data_1.default.RoomsData[data.joinCode];
    console.log(data_1.default.players);
    if (joinCode) {
        joinCode.players[theSocket] = { wins: 0 };
        // joinCode.players[theSocket] = { wins: 0 }; 
        joinCode.addPlayer(theSocket);
        data_1.default.players[theSocket].roomId = data.joinCode;
        console.log(data_1.default.players);
        return true;
    }
    else {
        console.log('not work');
        return false;
    }
}
async function createRoom(theSocket) {
    let roomId = String(Math.floor(100000 + Math.random() * 900000));
    if (!data_1.default.RoomsData[roomId]) {
        data_1.default.RoomsData[roomId] = new Rooms_1.default();
        data_1.default.RoomsData[roomId].addPlayer(theSocket);
        console.log(data_1.default.RoomsData[roomId].players, data_1.default.RoomsData);
        data_1.default.players[theSocket].roomId = roomId;
        return roomId;
    }
    else {
        return false;
    }
}
// console.log(createRoom('a'));
async function addMark(mark, socketId) {
    const secondPlayer = findSecondKey(data_1.default.RoomsData[data_1.default.players[socketId].roomId].players, socketId);
    console.log({ secondPlayer });
    if (mark === 'x') {
        data_1.default.RoomsData[data_1.default.players[socketId].roomId].players[socketId].mark = mark;
        data_1.default.RoomsData[data_1.default.players[socketId].roomId].players[secondPlayer].mark = 'o';
        return true;
    }
    else if (mark === 'o') {
        data_1.default.RoomsData[data_1.default.players[socketId].roomId].players[socketId].mark = mark;
        data_1.default.RoomsData[data_1.default.players[socketId].roomId].players[secondPlayer].mark = 'x';
        return true;
    }
    else
        return false;
}
// פונקציה שמקבלת מערך ומפתח ראשון ומחזירה את המפתח השני
function findSecondKey(obj, firstKey) {
    const keys = Object.keys(obj);
    console.log('here', { obj });
    const firstKeyIndex = keys.indexOf(firstKey);
    if (firstKeyIndex === -1) {
        throw new Error(`The key "${firstKey}" does not exist in the object.`);
    }
    // Remove the first key and return the second key if it exists
    keys.splice(firstKeyIndex, 1);
    return keys.length > 0 ? keys[0] : 'undefined';
}
// const secondKey = findSecondKey(exampleObj, "firstName");
// console.log(secondKey); // פלט: lastName
async function addNewUser(data, socketId) {
    data_1.default.players[socketId] = data;
    return true;
}
// function double(mark: string): (boolean | { mark: string; }[]) {
//     let winCheck1 = victoryCheck(mark, 1);
//     if (winCheck1) return winCheck1;
//     let winCheck2 = victoryCheck(mark, 3);
//     if (winCheck2) return winCheck2;
//     let winCheck3 = victoryCheck(mark, 4);
//     if (winCheck3) return winCheck3;
//     return false;
// }
// function winingFunction(lastChoice: number, mark: string): (boolean | { mark: string; }[]) {
//     if (lastChoice % 2 == 1) {
//         let test = victoryCheck('x', 3)
//         if (!test) {
//             test = victoryCheck('x', 1)
//         }
//         return test
//     }
//     else if (lastChoice % 2 == 1) {
//         let test = victoryCheck('x', 1)
//         // if (!test) {
//         //     let newTest = victoryCheck('x', 3)
//         //     if (!newTest) {
//         //         let newTest = victoryCheck('x', 4)
//         //         if (!newTest) {
//         //             let newTest = victoryCheck('x', 4)
//         //         }
//         //     }
//         // }
//         if (lastChoice % 2 == 0) {
//             let cheker = double(mark)
//             return cheker
//         }
//         return test
//     }
//     return false
// }
// function main1(mark: string)//:(Boolean | {mark: string;}[])
// {
//     // Chack for balace
//     for (let index = 0; index < gameSize; index++) {
//         const res = victoryCheck(mark, gameSize, index);
//         if (res) return res
//     }
//     // Chack for vertical
//     for (let index = 0; index < gameSize; index++) {
//         let location: number = 0
//         const res = victoryCheck(mark, gameSize, location);
//         if (res) return res
//         else location += gameSize
//     }
//     const res1 = victoryCheck(mark, gameSize + 1, 0);
//     if (res1) return res1
//     const res2 = victoryCheck(mark, gameSize + 1, gameSize);
//     if (res2) return res2
//     return false
// }
// פונקציה שמקבלת מיקום במערך ומחזירה איזה שורות צריך לבדוק ואם יש אלכסונים איזה לבדוק
// TO-DO // להעביר את gameSize לDATA
function rowStart(lastChoice) {
    const gameSize = 3;
    let toReturn = {};
    toReturn.startRow = Math.floor((lastChoice / gameSize)) * gameSize;
    toReturn.startcolom = lastChoice - toReturn.startRow;
    let rightDiagonal = lastChoice % (gameSize - 1);
    let leftDiagonal = lastChoice % (gameSize + 1);
    if (rightDiagonal == 0)
        toReturn.rightDiagonal = gameSize - 1;
    if (leftDiagonal == 0)
        toReturn.leftDiagonal = 0;
    return toReturn;
}
function getStartGameData(socketId) {
    const roomId = data_1.default.players[socketId].roomId;
    const { players } = data_1.default.RoomsData[roomId];
    const [secondPlayerID] = Object.keys(players).filter(id => id !== socketId);
    return {
        mark: players[socketId].mark,
        secondPlayerData: Object.assign(Object.assign({}, players[secondPlayerID]), { name: data_1.default.players[secondPlayerID].name })
    };
}
function victoryCheck(arr, mark, skip, location = 0) {
    var _a, _b;
    let theWining = [];
    for (let index = location; index < arr.length;) {
        if (theWining.length == 3) {
            return theWining;
        }
        else if (((_a = arr[index]) === null || _a === void 0 ? void 0 : _a.mark) == mark) {
            theWining.push({ mark: arr[index].mark, index });
            index += skip;
        }
        else if (((_b = arr[index]) === null || _b === void 0 ? void 0 : _b.mark) !== mark) {
            theWining = [];
            return false;
        }
        else
            return false;
    }
    if (!theWining[2]) {
        return false;
    }
    else
        return theWining;
}
function trying(arr, mark, sobjStart) {
    // startsRows.map(location=>{victoryCheck('x',2,location)})
    if (sobjStart.startcolom == 0 || sobjStart.startcolom) {
        let res = victoryCheck(arr, mark, gameSize, sobjStart.startcolom);
        if (res)
            return res;
    }
    if (sobjStart.startRow == 0 || sobjStart.startcolom) {
        let res = victoryCheck(arr, mark, 1, sobjStart.startRow);
        if (res)
            return res;
    }
    if (sobjStart.rightDiagonal) {
        let res = victoryCheck(arr, mark, gameSize - 1, sobjStart.rightDiagonal);
        if (res)
            return res;
    }
    if (sobjStart.leftDiagonal == 0 || sobjStart.startcolom) {
        let res = victoryCheck(arr, mark, gameSize + 1, sobjStart.leftDiagonal);
        if (res)
            return res;
    }
}
function dataAdder(lastChoice, 
// TODO // להוסיף למערך במידה והוא קטן מחמש ולהחזיר ללקוח
// ואם הוא גדול מחמש ואין מנצח אז לעדכן את המערך ולהחזיר ללקוח
playerId) {
    let mark = data_1.default.RoomsData[data_1.default.players[playerId].roomId].players[playerId].mark;
    let theArr = data_1.default.RoomsData[data_1.default.players[playerId].roomId].corrent;
    data_1.default.RoomsData[data_1.default.players[playerId].roomId].updateCorrent(lastChoice, mark);
    console.log(data_1.default.RoomsData[data_1.default.players[playerId].roomId].corrent.length);
    if (data_1.default.RoomsData[data_1.default.players[playerId].roomId].corrent.length >= 5) {
        let rowStarts = rowStart(lastChoice);
        const res = trying(theArr, mark, rowStarts);
        console.log(res);
        if (res)
            return { wins: res };
        return { lastChoice, mark };
    }
    return { lastChoice, mark };
}
// console.log(dataAdder(2, 'a'))
// console.log(dataAdder(3, 'b'))
// console.log(dataAdder(0, 'b'))
// console.log(dataAdder(8, 'a'))
// console.log(dataAdder(5, 'a'))
// console.log(DB.RoomsData[DB.players['a'].roomId as string].corrent);
// console.log(trying('o', { startRow: 0, startcolom: 2, rightDiagonal: 2 }));
let arr = [{ mark: 'x', loction: 0 }, { mark: 'x', loction: 1 }, { mark: 'o', loction: 2 },
    { mark: 'x', loction: 3 }, { mark: 'o', loction: 4 }, { mark: 'o', loction: 5 },
    { mark: 'x', loction: 6 }, { mark: 'x', loction: 7 }, { mark: 'x', loction: 8 },
];
exports.default = { dataAdder, getStartGameData, addNewUser, handleJoin, createRoom, addMark, };
