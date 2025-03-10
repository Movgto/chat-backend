import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import RoomController from './controllers/RoomController.js'

const app = express()
const server = createServer(app)
export const io = new Server(
    server,
    {
        cors: {
            origin: [
                'http://localhost:3000',
                'https://chat-maro.netlify.app'
            ]            
        }
    }
)

server.listen(3000, () => {
    console.log('Listening on port 3000')
})

io.on('connection', (socket) => {
    // console.log('Nueva conexión', socket)

    socket.on('disconnecting', res => {
        console.log(res)

        if (socket.rooms.size < 2) return

        const currentRoomStr = [...socket.rooms][1]

        const currentRoomId = currentRoomStr.split('-')[1].trim()

        console.log("Disconnecting from room with id: ", currentRoomId)

        const currentRoom = RoomController.rooms.find(r => r.id === currentRoomId)

        if (!currentRoom) return

        console.log('Removing room')

        RoomController.rooms = RoomController.rooms.filter(r => r.id !== currentRoomId)

        console.log('Remaining rooms: ', RoomController.rooms)

        console.log('Closing connection from socket')
        socket.conn.close()
    })
    
    socket.on('findPublicRoom', cb => {
        RoomController.findPublicRoom(cb)
    })

    socket.on('createRoom', (args, cb) => {        
        RoomController.createRoom(socket, args, cb)
    })

    socket.on('joinRoom', (args, cb) => {
        console.log('Join a room request received')
        RoomController.joinRoom(socket, args, cb)
    })

    socket.on('sendMessage', (args, cb) => {
        console.log('New message received: ', args.message.content)
        RoomController.newMessage(args, cb)
    })
})