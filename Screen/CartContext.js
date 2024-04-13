import React, { createContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [datas, setDatas] = useState([]);

  const updateData = (newData) => {
    setDatas(prevDatas => {
      // หา index ของข้อมูลที่ต้องการแก้ไข
      const dataIndex = prevDatas.findIndex(item => item.data.details === newData.data.details);
      if (dataIndex !== -1) {
        // ถ้ามีข้อมูลอยู่แล้ว ให้แก้ไขข้อมูลในอาเรย์
        const updatedDatas = [...prevDatas];
        updatedDatas[dataIndex] = newData;
        return updatedDatas;
      } else {
        // ถ้าไม่มีข้อมูลอยู่ในอาเรย์ ให้เพิ่มข้อมูลเข้าไป
        return [...prevDatas, newData];
      }
    });
  };

  return (
    <CartContext.Provider value={{ datas, updateData }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
