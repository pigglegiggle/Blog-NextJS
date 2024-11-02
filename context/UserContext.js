import React, { createContext, useContext, useState } from 'react';
const UserContext = createContext();

export const UserProvider = ( { children } ) => {
    const [message, setMessage] = useState('');
    return(
        <UserContext.Provider value={{message, setMessage}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
}