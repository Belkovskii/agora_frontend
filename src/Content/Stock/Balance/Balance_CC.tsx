
import React, {useEffect, useState} from "react";
import Balance from "./Balance"
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems, setNewItems, fetchStocks, setNewStocks } from "./BalanceSlice";
import {RootState} from "./../../../store";
import { AppDispatch } from "./../../../store";

const Balance_CC : React.FunctionComponent = () => {
    let [itemName, setItemName] = useState("");
    let [toItem, setToItem] = useState(10);
    let [fromItem, setFromItem] = useState(0);

    let [stockName, setStockName] = useState("");
    let [toStock, setToStock] = useState(10);
    let [fromStock, setFromStock] = useState(0);

    const dispatch = useDispatch<AppDispatch>();

    const stockBalanceState = useSelector((state: RootState) => state.stock.balance);

    useEffect(() => {        
        dispatch(fetchItems({ from : fromItem, to : toItem, name : itemName }));
    }, [toItem, fromItem]);

    useEffect(() => {
        dispatch(setNewItems({from : fromItem, to : toItem, name : itemName }))
    }, [itemName]);

    useEffect(() => {
        dispatch(fetchStocks({from : fromStock, to : toStock, name : stockName}));
    }, [toStock, fromStock]);

    useEffect(() => {
        dispatch(setNewStocks({from : fromStock, to : toStock, name : stockName }));
    }, [stockName]);

    const filterByName = {
        filterItemByName(inputValue : any) { 
            setFromItem(0);
            setToItem(10);
            setItemName(inputValue.key ?? "");       
        },
        filterStockByName(inputValue : any) {
            setFromStock(0);
            setToStock(10);
            setStockName(inputValue.key ?? "");
        }
    };

    const onMenuScrollDown = {
        onItemMenuScrollDown(from : number, to : number) {
            setFromItem(from);
            setToItem(to);
        },
        onStockMenuScrollDown (from : number, to : number) {
            setFromStock(from);
            setToStock(to);
        }     

    }

    const handleChange = {
        handleItemChange(selectedOption: any) {
            if (selectedOption) {            
                setItemName(selectedOption.label);
            }
        },
        handleStockChange(selectedOption: any) {
            if (selectedOption) {
                setStockName(selectedOption.label);
            }
        }
    }

    return (
        <Balance 
            stockBalanceState={stockBalanceState}
            filterByName={filterByName}
            handleChange={handleChange}                               
            onMenuScrollDown={onMenuScrollDown}  
        />
    )
}

export default Balance_CC;