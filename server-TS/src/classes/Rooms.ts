interface room {
    players: { [key: string]: { wins: number, mark?: string } },
    corrent: {  mark: string }[],
}

export default class Rooms implements room {
    players: { [key: string]: { wins: number, mark?: string } };
    corrent: {  mark: string }[];
    constructor() {
        this.players = {};
        this.corrent = [];
    }
    addPlayer(playerId: string, mark?: string) {
        if (!this.players[playerId]) {
            this.players[playerId] = { wins: 0, mark: mark };
            return true
        } else {
            console.log(`Player with ID ${playerId} already exists.`);
        }
    }
    updateCorrent(location: number,  mark: string) {
        if (!this.corrent[location]) {
            this.corrent[location] = {  mark: mark }
            return true
        } else {
            console.log(`location ${location} occupied.`);
        }
    }
    clearCorrent(){
        this.corrent=[]
        return true
    }
    addWins(playerId: string){
        this.players[playerId].wins += 1
    }
}