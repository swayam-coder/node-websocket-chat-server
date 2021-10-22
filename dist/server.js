"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const socket_1 = __importDefault(require("./socket"));
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true
    }
});
app.use((0, cors_1.default)());
app.get("/", (_, res) => {
    res.send('chat app running');
});
httpServer.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`);
    (0, socket_1.default)({ io });
});
//# sourceMappingURL=server.js.map