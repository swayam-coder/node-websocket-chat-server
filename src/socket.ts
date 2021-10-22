import { Socket, Server } from "socket.io"
import { addUser, removeUser, getUser, getUsersInRoom } from "../src/util/users";

function socket({ io }: { io: Server }) {
    io.on("connection", (socket: Socket) => {
        socket.on('join', ({ room, name, id }, callback) => {
            const { error, user } = addUser({uid: socket.id, room, name, id})

            if(user === undefined) {
                return callback(new Error("something wrong happened"))
            }
    
            if(error) return callback(error)
            socket.join(user.sig)
    
            socket.emit("message", {user: "admin", message: `welcome to ${user.room}`})
            socket.broadcast.to(user.sig).emit("message", {user: "admin", message: `${user.name} just joined !`})
    
            io.to(user.sig).emit("roomInfo", {room: user.room, id: user.rid, users: getUsersInRoom(user.sig)})
    
            callback();
        })
    
        socket.on('sendMessage', (message, callback) => {
            const user = getUser(socket.id)

            if(user === null) {
                return callback(new Error("something wrong happened"))
            }

            io.to(user.sig).emit("message", {user: user.name, message})
    
            callback();
        })
    
        socket.on("disconnect", function(){
            const user = removeUser(socket.id);

            if(user == null) {
                console.log(`user with socket id ${socket.id} was not find while disconnecting`)
                return
            } 

            if(user) {
                io.to(user.sig).emit('message', { user: 'admin', message: `${user.name} has left.` });
                io.to(user.sig).emit('roomInfo', { room: user.room, id: user.rid, users: getUsersInRoom(user.sig)});
            }
        })
    })
}

export default socket