const users = [];

const addUser = ({uid, room, name, id}) => {
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

const removeUser = (id) => {
  const index = users.findIndex((user) => user.uid === id);

  if(index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => users.find((user) => user.uid === id);

const getUsersInRoom = (room) => users.filter((user) => user.sig === room);

module.exports = {users, addUser, removeUser, getUser, getUsersInRoom };