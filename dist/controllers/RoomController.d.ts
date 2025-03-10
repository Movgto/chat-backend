import { Socket } from "socket.io";
import { CreateRoomArgs, JoinRoomArgs, SendMessageArgs } from "../types/room.js";
import Room from "../classes/Room.js";
declare class RoomController {
    static rooms: Room[];
    static findPublicRoom(cb: Function): any;
    static createRoom(socket: Socket, args: CreateRoomArgs, cb: Function): any;
    static joinRoom(socket: Socket, args: JoinRoomArgs, cb: Function): any;
    static newMessage(args: SendMessageArgs, cb: Function): any;
}
export default RoomController;
