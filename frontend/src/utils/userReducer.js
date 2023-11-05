// userReducer.js
const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    name: localStorage.getItem('name') || '',
    userRole: localStorage.getItem('userRole') || '',
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          isLoggedIn: true,
          name: action.payload.name,
          userRole: action.payload.userRole,
        };
      case 'LOGOUT':
        return {
          ...state,
          isLoggedIn: false,
          name: '',
          userRole: '',
        };
      default:
        return state;
    }
};

export default userReducer;
