export const generateID = (user, selectedUser) => {
  return (user + selectedUser).split('').sort().join('');
};
