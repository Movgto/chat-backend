import { User } from "../types/index.js";
import { CreateRoomArgs } from "../types/room.js";
import { Message } from '../types/room.js';
declare class Room {
    id: string;
    pub: boolean;
    name: string;
    users: User[];
    messages: Message[];
    constructor(args: CreateRoomArgs);
    addUser(user: User): false | undefined;
    removeUser(name: string): false | undefined;
    isAvailableAndPublic(): boolean;
    newMessage(message: Message): void;
    private syncRoom;
}
export default Room;
