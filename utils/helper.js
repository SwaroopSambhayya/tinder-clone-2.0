export const generateId = (id1, id2) =>
  id1.length > id2.length ? id1 + id2 : id2 + id1;

export const getMatchedUserId = (macthedUsers, currentUserId) => {
  let users = { ...macthedUsers.users };

  delete users[currentUserId];

  const [id, user] = Object.entries(users).flat();

  return { id, ...user };
};
