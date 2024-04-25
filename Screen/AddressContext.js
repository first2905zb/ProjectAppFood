import React, { createContext, useState } from 'react';

const AddressContext = createContext();

export const AddressContextProvider = ({ children }) => {
  const [datas, setDatas] = useState([]);

  const updateDataAdd = (newData) => {
    setDatas(prev => {
      return [...prev, newData]});
  };

  return (
    <AddressContext.Provider value={{ datas, updateDataAdd }}>
      {children}
    </AddressContext.Provider>
  );
};

export default AddressContext;
