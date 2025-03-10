import { io } from '../index.js';
class Room {
    id;
    pub;
    name;
    users;
    messages;
    constructor(args) {
        const id = Math.random().toString(36).substring(7);
        this.name = 'room - ' + id;
        this.users = [];
        this.messages = [];
        this.pub = args.pub;
        this.id = id;
    }
    addUser(user) {
        const userExists = this.users.find(u => u.name === user.name);
        if (userExists)
            return false;
        this.users.push(user);
        this.syncRoom();
    }
    removeUser(name) {
        const userExists = this.users.find(u => u.name === name);
        if (!userExists)
            return false;
        this.users = this.users.filter(u => u.name !== name);
        this.syncRoom();
    }
    isAvailableAndPublic() {
        // Check if the room is public
        if (!this.pub)
            return false;
        return true;
    }
    newMessage(message) {
        this.messages.push(message);
        this.syncRoom();
    }
    syncRoom() {
        io.to(this.name).emit('syncRoom', this);
    }
}
export default Room;
//# sourceMappingURL=Room.js.map