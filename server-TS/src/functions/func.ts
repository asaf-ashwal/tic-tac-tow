import Rooms from '../classes/Rooms';
import Player from '../classes/players';
import DB from '../data'

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

export default { addNewUser, handleJoin, createRoom, addMark, winingFunction }



let arr = [{ mark: 'x' }, { mark: 'x' }, { mark: 'x' }, { mark: 'x' }, { mark: 'x' }, { mark: 'x' }, { mark: 'x' }, { mark: 'x' }, { mark: 'x' },]








function double(mark: string): (boolean | { mark: string; }[]) {
    let winCheck1 = victoryCheck(mark, 1);
    if (winCheck1) return winCheck1;

    let winCheck2 = victoryCheck(mark, 3);
    if (winCheck2) return winCheck2;

    let winCheck3 = victoryCheck(mark, 4);
    if (winCheck3) return winCheck3;

    return false;
}











function winingFunction(lastChoice: number, mark: string): (boolean | { mark: string; }[]) {
    if (lastChoice % 2 == 1) {
        let test = victoryCheck('x', 3)
        if (!test) {
            test = victoryCheck('x', 1)
        }
        return test
    }
    else if (lastChoice % 2 == 1) {
        let test = victoryCheck('x', 1)
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
            let cheker = double(mark)
            return cheker
        }
        return test
    }
    return false
}
function dataAdder(theNewObj: { lastChoice: number, mark: string }, playerId: string) {
    let count = DB.RoomsData[DB.players[playerId].roomId as string].corrent.filter(element => element !== undefined).length;
    if (count >= 5) {

    }
} function victoryCheck(mark: string, skip: number, location: number = 0) {
    let theWining = [];
    for (let index = location; index < arr.length;) {
        if (theWining.length == 3) {
            return theWining
        } else if (arr[index].mark == mark) {
            theWining.push(arr[index])
            index += skip
        } else if (arr[index].mark !== mark) {
            theWining = []
            return false
        }
        else return false
    }
    if (!theWining[2]) {
        return false
    } else return theWining

}










function main1(mark: string)//:(Boolean | {mark: string;}[])
{
    const gameSize = 3;

    // Chack for balace
    for (let index = 0; index < gameSize; index++) {
        const res = victoryCheck(mark, gameSize, index);
        if (res) return res
    }

    // Chack for vertical
    for (let index = 0; index < gameSize; index++) {
        let location: number = 0
        const res = victoryCheck(mark, gameSize, location);
        if (res) return res
        else location += gameSize
    }

    const res1 = victoryCheck(mark, gameSize + 1, 0);
    if (res1) return res1

    const res2 = victoryCheck(mark, gameSize + 1, gameSize);
    if (res2) return res2

    return false


}
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
console.log(
    rowStart(5)
);