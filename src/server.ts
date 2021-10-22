import express, { Response } from "express";
import cors from "cors";
import { Server } from "socket.io"
import { createServer } from "http";
import socket from "./socket";
import dotenv from "dotenv"

dotenv.config()

const app = express();

const httpServer = createServer(app)

// const io = require("socket.io")(5000, {
//     cors: {
//         origin: "http://localhost:3000",
//         methods: ["GET", "POST"]
//     }
// });

const io = new Server(httpServer, {
    cors: {
        origin: process.env.CLIENT_PORT,
        methods: ["GET", "POST"],
        credentials: true
    }
})

app.use(cors());

app.get("/", (_, res: Response) =>{
    res.send('chat app running')
})

httpServer.listen(process.env.PORT,  () => {
    console.log(`server running on port ${process.env.PORT}`)
    socket({ io })
})

/* socket.send, socket.join */
// http://localhost:3000/