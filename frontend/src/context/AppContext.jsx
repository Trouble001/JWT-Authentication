import { createContext, useEffect, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [toggle, setToggle] = useState(false);
  
  return (
    <AppContext.Provider value={{ toggle, setToggle }}>
      {children}
    </AppContext.Provider>
  );
};
