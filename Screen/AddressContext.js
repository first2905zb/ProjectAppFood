import React, { createContext, useState } from 'react';

const AddressContext = createContext();

export const AddressContextProvider = ({ children }) => {
  const [datas, setDatas] = useState([]);

  const updateData = (newData) => {
    setDatas(newData);
  };

  return (
    <AddressContext.Provider value={{ datas, updateData }}>
      {children}
    </AddressContext.Provider>
  );
};

export default AddressContext;
