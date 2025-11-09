import React, { createContext, useState, useContext } from 'react';

const DreamContext = createContext();

export const useDreams = () => useContext(DreamContext);

export const DreamProvider = ({ children }) => {
  const [dreams, setDreams] = useState([]);

  const addDream = (dream) => {
    setDreams((currentDreams) => [...currentDreams, dream]);
  };

  return (
    <DreamContext.Provider value={{ dreams, addDream }}>
      {children}
    </DreamContext.Provider>
  );
};
