
// Action creator for updating user data
export const updateUser = (userData) => ({
    type: 'UPDATE_USER',
    payload: userData,
  });

export const getUser = (userData) => ({
    type: 'GET_USER',
    payload: userData,
  });