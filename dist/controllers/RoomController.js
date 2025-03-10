import Room from "../classes/Room.js";
class RoomController {
    static rooms = [];
    static findPublicRoom(cb) {
        const room = this.rooms.find(r => r.isAvailableAndPublic());
        if (!room) {
            console.log('Could not find an available room to join you');
            return cb({ success: false, message: "Couldn't find a public room to join you" });
        }
        console.log("Rooms: ", this.rooms);
        cb({ success: true, room });
    }
    static createRoom(socket, args, cb) {
        console.log('Creating the room');
        const newRoom = new Room(args);
        console.log('Signing you up to the room');
        this.rooms.push(newRoom);
        console.log('Joining to the room');
        console.log('Players: ', newRoom.users);
        return cb({ success: true, message: 'A new Room has been created!', room: {
                pub: newRoom.pub,
                users: newRoom.users,
                name: newRoom.name,
                id: newRoom.id
            } });
    }
    static joinRoom(socket, args, cb) {
        const roomIdx = this.rooms.findIndex(r => r.id === args.roomId);
        if (roomIdx === -1)
            return cb({ success: false, message: "Couldn't find the room" });
        const room = this.rooms[roomIdx];
        room.addUser({
            name: args.playerName
        });
        socket.join(room.name);
        return cb({ success: true, message: 'Joined to room ' + room.name, room });
    }
    static newMessage(args, cb) {
        const room = this.rooms.find(r => r.id === args.roomId);
        if (!room)
            return cb({ success: false, message: 'The room doesn\'t exist' });
        room.newMessage(args.message);
    }
}
export default RoomController;
//# sourceMappingURL=RoomController.js.map