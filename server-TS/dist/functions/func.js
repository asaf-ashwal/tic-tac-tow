"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Rooms_1 = __importDefault(require("../classes/Rooms"));
const data_1 = __importDefault(require("../data"));
async function handleJoin(data, theSocket) {
    if (data_1.default.RoomsData[data.joinCode]) {
        data_1.default.RoomsData[data.joinCode].players[theSocket] = { wins: 0 };
        console.log(data_1.default.RoomsData[data.joinCode]);
        return true;
    }
    else {
        console.log('not work');
        return false;
    }
}
async function createRoom(theSocket) {
    //    TO DO ||  כשאתה מוסיף יוזר בחיבור צריך להוסיף לו פה את הקוד לחדר
    let roomId = String(Math.floor(100000 + Math.random() * 900000));
    if (!data_1.default.RoomsData[roomId]) {
        data_1.default.RoomsData[roomId] = new Rooms_1.default();
        data_1.default.RoomsData[roomId].addPlayer(theSocket);
        // DB.players[theSocket].roomId =roomId
        return roomId;
    }
    else {
        return false;
    }
}
// console.log(createRoom('a'));
async function addMark(mark, socketId) {
    const secondPlayer = findSecondKey(data_1.default.RoomsData[data_1.default.players[socketId].roomId].players, socketId);
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
exports.default = { addNewUser, handleJoin, createRoom, addMark, winingFunction };
let arr = [{ mark: 'x' }, { mark: 'x' }, { mark: 'x' }, { mark: 'x' }, { mark: 'x' }, { mark: 'x' }, { mark: 'x' }, { mark: 'x' }, { mark: 'x' },];
function double(mark) {
    let winCheck1 = victoryCheck(mark, 1);
    if (winCheck1)
        return winCheck1;
    let winCheck2 = victoryCheck(mark, 3);
    if (winCheck2)
        return winCheck2;
    let winCheck3 = victoryCheck(mark, 4);
    if (winCheck3)
        return winCheck3;
    return false;
}
function winingFunction(lastChoice, mark) {
    if (lastChoice % 2 == 1) {
        let test = victoryCheck('x', 3);
        if (!test) {
            test = victoryCheck('x', 1);
        }
        return test;
    }
    else if (lastChoice % 2 == 1) {
        let test = victoryCheck('x', 1);
        // if (!test) {
        //     let newTest = victoryCheck('x', 3)
        //     if (!newTest) {
        //         let newTest = victoryCheck('x', 4)
        //         if (!newTest) {
        //             let newTest = victoryCheck('x', 4)
        //         }
        //     }
        // }
        if (lastChoice % 2 == 0) {
            let cheker = double(mark);
            return cheker;
        }
        return test;
    }
    return false;
}
function dataAdder(theNewObj, playerId) {
    let count = data_1.default.RoomsData[data_1.default.players[playerId].roomId].corrent.filter(element => element !== undefined).length;
    if (count >= 5) {
    }
}
function victoryCheck(mark, skip, location = 0) {
    let theWining = [];
    for (let index = location; index < arr.length;) {
        if (theWining.length == 3) {
            return theWining;
        }
        else if (arr[index].mark == mark) {
            theWining.push(arr[index]);
            index += skip;
        }
        else if (arr[index].mark !== mark) {
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
function main1(mark) {
    const gameSize = 3;
    // Chack for balace
    for (let index = 0; index < gameSize; index++) {
        const res = victoryCheck(mark, gameSize, index);
        if (res)
            return res;
    }
    // Chack for vertical
    for (let index = 0; index < gameSize; index++) {
        let location = 0;
        const res = victoryCheck(mark, gameSize, location);
        if (res)
            return res;
        else
            location += gameSize;
    }
    const res1 = victoryCheck(mark, gameSize + 1, 0);
    if (res1)
        return res1;
    const res2 = victoryCheck(mark, gameSize + 1, gameSize);
    if (res2)
        return res2;
    return false;
}
function rowStart(lastChoice) {
    const gameSize = 4;
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
console.log(rowStart(5));
