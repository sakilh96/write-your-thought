// reducers/userReducer.js
const initialState = {
    user: null, // Initial user state
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_USER':
        return {
          ...state,
          user: action.payload,
        };
    case 'GET_USER':
        return {
            ...state,
            user: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  