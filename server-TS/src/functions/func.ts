import Rooms from '../classes/Rooms';
import Player from '../classes/players';
import DB from '../data'

const gameSize = 3;

async function handleJoin(data: { userInfo: { name: string }, joinCode: string }, theSocket: string): Promise<boolean> {
    if (DB.RoomsData[data.joinCode]) {
        DB.RoomsData[data.joinCode].players[theSocket] = { wins: 0 };
        console.log(DB.RoomsData[data.joinCode]);

        return true;
    } else {
        console.log('not work')
        return false;
    }
}

async function createRoom(theSocket: string) {

    //    TO DO ||  כשאתה מוסיף יוזר בחיבור צריך להוסיף לו פה את הקוד לחדר
    let roomId = String(Math.floor(100000 + Math.random() * 900000))
    if (!DB.RoomsData[roomId]) {
        DB.RoomsData[roomId] = new Rooms()
        DB.RoomsData[roomId].addPlayer(theSocket)
        // DB.players[theSocket].roomId =roomId
        return roomId
    } else { return false }
}

// console.log(createRoom('a'));

async function addMark(mark: string, socketId: string): Promise<boolean> {
    const secondPlayer = findSecondKey(DB.RoomsData[DB.players[socketId].roomId as string].players, socketId)
    if (mark === 'x') {
        DB.RoomsData[DB.players[socketId].roomId as string].players[socketId].mark = mark
        DB.RoomsData[DB.players[socketId].roomId as string].players[secondPlayer as string].mark = 'o'
        return true
    } else if (mark === 'o') {
        DB.RoomsData[DB.players[socketId].roomId as string].players[socketId].mark = mark
        DB.RoomsData[DB.players[socketId].roomId as string].players[secondPlayer as string].mark = 'x'
        return true
    } else return false
}





// פונקציה שמקבלת מערך ומפתח ראשון ומחזירה את המפתח השני
function findSecondKey(obj: { [key: string]: any }, firstKey: string): string | string {
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

async function addNewUser(data: Player, socketId: string): Promise<boolean> {
    DB.players[socketId] = data
    return true
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
function rowStart(lastChoice: number): {
    rightDiagonal?: number | undefined;
    leftDiagonal?: number | undefined;
    startRow?: number | undefined;
    startcolom?: number | undefined;
} {
    const gameSize = 3;
    let toReturn: { rightDiagonal?: number, leftDiagonal?: number, startRow?: number, startcolom?: number } = {}
    toReturn.startRow = Math.floor((lastChoice / gameSize)) * gameSize
    toReturn.startcolom = lastChoice - toReturn.startRow
    let rightDiagonal = lastChoice % (gameSize - 1)
    let leftDiagonal = lastChoice % (gameSize + 1)
    if (rightDiagonal == 0) toReturn.rightDiagonal = gameSize - 1
    if (leftDiagonal == 0) toReturn.leftDiagonal = 0
    return toReturn
}





function getStartGameData(socketId: string) {
    const { players } = DB.RoomsData['123456'];
    const [secondPlayerID] = Object.keys(players).filter(id => id !== socketId);

    return {
        mark: players[socketId].mark,
        secondPlayerData: {
            ...players[secondPlayerID],
            name: DB.players[secondPlayerID].name
        }
    };
}


function victoryCheck(arr: { mark: string }[], mark: string, skip: number, location: number = 0) {
    let theWining = [];
    for (let index = location; index < arr.length;) {
        if (theWining.length == 3) {
            return theWining
        } else if (arr[index]?.mark == mark) {
            theWining.push({ mark: arr[index].mark, index })
            index += skip
        } else if (arr[index]?.mark !== mark) {
            theWining = []
            return false
        }
        else return false
    }
    if (!theWining[2]) {
        return false
    } else return theWining

}



function trying(arr: { mark: string }[], mark: string, sobjStart: { startcolom: number, startRow: number, rightDiagonal?: number, leftDiagonal?: number }
) {

    // startsRows.map(location=>{victoryCheck('x',2,location)})
    if (sobjStart.startcolom == 0 || sobjStart.startcolom) {
        let res = victoryCheck(arr, mark, gameSize, sobjStart.startcolom)
        if (res) return res
    }
    if (sobjStart.startRow == 0 || sobjStart.startcolom) {
        let res = victoryCheck(arr, mark, 1, sobjStart.startRow)
        if (res) return res
    }
    if (sobjStart.rightDiagonal) {
        let res = victoryCheck(arr, mark, gameSize - 1, sobjStart.rightDiagonal)
        if (res) return res
    }
    if (sobjStart.leftDiagonal == 0 || sobjStart.startcolom) {
        let res = victoryCheck(arr, mark, gameSize + 1, sobjStart.leftDiagonal)
        if (res) return res
    }
}




function dataAdder(lastChoice: number,
    // TODO // להוסיף למערך במידה והוא קטן מחמש ולהחזיר ללקוח
    // ואם הוא גדול מחמש ואין מנצח אז לעדכן את המערך ולהחזיר ללקוח
    playerId: string) {
    let mark = DB.RoomsData[DB.players[playerId].roomId as string].players[playerId].mark
    let theArr = DB.RoomsData[DB.players[playerId].roomId as string].corrent
    DB.RoomsData[DB.players[playerId].roomId as string].updateCorrent(lastChoice, mark as string)
    console.log(DB.RoomsData[DB.players[playerId].roomId as string].corrent.length);

    if (DB.RoomsData[DB.players[playerId].roomId as string].corrent.length >= 5) {


        let rowStarts = rowStart(lastChoice);
        const res = trying(theArr, mark as string, rowStarts as { startcolom: number, startRow: number, rightDiagonal?: number, leftDiagonal?: number })

        console.log(res);

        if (res) return { wins: res }
        return { lastChoice, mark }
    }
    return { lastChoice, mark }

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
    ]
    
export default { dataAdder, getStartGameData, addNewUser, handleJoin, createRoom, addMark, }