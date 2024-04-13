import React, { createContext, useState } from 'react';

const AddressContext = createContext();

export const AddressContextProvider = ({ children }) => {
  const [datas, setDatas] = useState([]);

  const updateData = (newData) => {
    setDatas(prev => {
      return [...prev, newData]});
  };

  return (
    <AddressContext.Provider value={{ datas, updateData }}>
      {children}
    </AddressContext.Provider>
  );
};

export default AddressContext;
