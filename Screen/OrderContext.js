import { StyleSheet } from 'react-native'
import React, { createContext, useState } from 'react'

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [datasOrder, setDatasOrder] = useState([]);

    const updateDataOrder = (newData) => {
        setDatasOrder(prev => {
            const dataIndex = prev.findIndex(item => item.name === newData.name);
            if (dataIndex !== -1) {
                const updatedDatas = [...prev];
                updatedDatas[dataIndex] = newData;
                return updatedDatas;
            } else {
                return [...prev, newData];
            }
        });
    };

    return (
        <OrderContext.Provider value={{ datasOrder, updateDataOrder }}>
            {children}
        </OrderContext.Provider>
    )
}

export default OrderContext

const styles = StyleSheet.create({})