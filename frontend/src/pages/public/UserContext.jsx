import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [userRole, setUserRole] = useState(null);

    const login = (token, role) => {
      // Stockez le rôle de l'utilisateur dans l'état du contexte
      setUserRole(role);
      // Stockez également le token JWT si nécessaire
      setUserRole(token);
    };

    return (
      <UserContext.Provider value={{ userRole, login }}>
        {children}
      </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}