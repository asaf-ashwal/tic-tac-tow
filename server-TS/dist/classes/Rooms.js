"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Rooms {
    constructor() {
        this.players = {};
        this.corrent = [];
    }
    addPlayer(playerId, mark) {
        if (!this.players[playerId]) {
            this.players[playerId] = { wins: 0, mark: mark };
            return true;
        }
        else {
            console.log(`Player with ID ${playerId} already exists.`);
        }
    }
    updateCorrent(location, mark) {
        if (!this.corrent[location]) {
            this.corrent[location] = { mark: mark };
            return true;
        }
        else {
            console.log(`location ${location} occupied.`);
        }
    }
    clearCorrent() {
        this.corrent = [];
        return true;
    }
    addWins(playerId) {
        this.players[playerId].wins += 1;
    }
}
exports.default = Rooms;
