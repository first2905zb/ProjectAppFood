import React, { createContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [datas, setDatas] = useState([]);

  const updateData = (newData) => {
    setDatas(prevDatas => {
      const dataIndex = prevDatas.findIndex(item => item.data.details === newData.data.details);
      if (dataIndex !== -1) {
        const updatedDatas = [...prevDatas];
        updatedDatas[dataIndex] = newData;
        return updatedDatas;
      } else {
        return [...prevDatas, newData];
      }
    });
  };

  const clearData = () => {
    setDatas([])
  }

  return (
    <CartContext.Provider value={{ datas, updateData, clearData }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
