import { userInterface, userParameterInterface } from "../interface/users"

export const users: Array<userInterface> = [];

export const addUser = ({uid, room, name, id}: userParameterInterface) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find((user) => user.room === room && user.name === name && user.rid === id);

  // if(!name || !room || !id) return { error: 'Username,room,roomid are required.' };
  if(existingUser) return { error: 'Username is taken.' };

  const roomSignature = `${room}${id}`

  const user = { uid, name, room, rid: id, sig: roomSignature };

  users.push(user);

  return { user };
}

export const removeUser = (id: string) => {
  const index = users.findIndex((user) => user.uid === id);

  if(index !== -1) return users.splice(index, 1)[0]
  else return null
}

export const getUser = (id: string) => {
  const val = users.find((user) => user.uid === id);

  if(val == undefined) {
    return null
  }

  return val
}

export const getUsersInRoom = (room: string | string[]) => users.filter((user) => user.sig === room);