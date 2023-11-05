// userActions.js
export const login = (name, userRole) => {
    return {
      type: 'LOGIN',
      payload: { name, userRole },
    };
};

export const logout = () => {
    return { type: 'LOGOUT' };
};
