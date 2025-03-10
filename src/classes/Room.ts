import { io } from '../index'
import { User } from "../types"
import { CreateRoomArgs } from "../types/room"
import { Message } from '../types/room'

class Room {
    id: string
    pub: boolean
    name: string
    users: User[]  
    messages: Message[]

    constructor(args: CreateRoomArgs) {
        const id = Math.random().toString(36).substring(7)  
        this.name = 'room - ' + id
        this.users = []
        this.messages = []
        this.pub = args.pub
        this.id = id
                
    }

    addUser(user: User) {
        const userExists = this.users.find(u => u.name === user.name)

        if (userExists) return false

        this.users.push(user)

        this.syncRoom()
    }

    removeUser(name: string) {
        const userExists = this.users.find(u => u.name === name)

        if (!userExists) return false

        this.users = this.users.filter(u => u.name !== name)

        this.syncRoom()
    }

    isAvailableAndPublic(): boolean {

        // Check if the room is public
        if (!this.pub) return false       

        return true
    }

    newMessage(message: Message) {
        this.messages.push(message)

        this.syncRoom()
    }

    private syncRoom() {
        io.to(this.name).emit('syncRoom', this)
    }
}

export default Room