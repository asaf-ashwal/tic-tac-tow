interface Player {
    name: string;
    imag: number;
    roomId?: string;
}


export default class PlayerClass implements Player {
    name: string;
    imag: number;
    roomId?: string;
    constructor(name: string, imag: number, roomId?: string) {
        this.name = name;
        this.imag = imag;
        this.roomId = roomId;
    }
}
