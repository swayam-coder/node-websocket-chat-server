"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersInRoom = exports.getUser = exports.removeUser = exports.addUser = exports.users = void 0;
exports.users = [];
const addUser = ({ uid, room, name, id }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();
    const existingUser = exports.users.find((user) => user.room === room && user.name === name && user.rid === id);
    if (existingUser)
        return { error: 'Username is taken.' };
    const roomSignature = `${room}${id}`;
    const user = { uid, name, room, rid: id, sig: roomSignature };
    exports.users.push(user);
    return { user };
};
exports.addUser = addUser;
const removeUser = (id) => {
    const index = exports.users.findIndex((user) => user.uid === id);
    if (index !== -1)
        return exports.users.splice(index, 1)[0];
    else
        return null;
};
exports.removeUser = removeUser;
const getUser = (id) => {
    const val = exports.users.find((user) => user.uid === id);
    if (val == undefined) {
        return null;
    }
    return val;
};
exports.getUser = getUser;
const getUsersInRoom = (room) => exports.users.filter((user) => user.sig === room);
exports.getUsersInRoom = getUsersInRoom;
//# sourceMappingURL=users.js.map