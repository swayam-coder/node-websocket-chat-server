const express = require("express")
const cors = require("cors");
const {addUser, removeUser, getUser, getUsersInRoom, users} = require("./users.js")

const app = express();

const io = require("socket.io")(5000, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

app.use(cors());

io.on("connection", socket => {
    socket.on('join', ({room, name, id}, callback) => {
        const { error, user } = addUser({uid: socket.id, room, name, id})

        console.log(users);

        if(error) return callback(error)
        socket.join(user.sig)

        socket.emit("message", {user: "admin", message: `welcome to ${user.room}`})
        socket.broadcast.to(user.sig).emit("message", {user: "admin", message: `${user.name} just joined !`})

        io.to(user.sig).emit("roomInfo", {room: user.room, id: user.rid, users: getUsersInRoom(user.sig)})

        callback();
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)
        io.to(user.sig).emit("message", {user: user.name, message})

        callback();
    })

    socket.on("disconnect", function(){
        const user = removeUser(socket.id);
        if(user) {
            io.to(user.sig).emit('message', { user: 'admin', message: `${user.name} has left.` });
            io.to(user.sig).emit('roomInfo', { room: user.room, id: user.rid, users: getUsersInRoom(user.sig)});
        }
    })
})

/* socket.send, socket.join */
// http://localhost:3000/