
import React, {useEffect, useState} from "react";
import Balance from "./Balance"
import { useDispatch, useSelector } from 'react-redux';
import { 
    fetchItems, 
    setNewItems, 
    fetchStocks, 
    setNewStocks,
    setSelectedItem,
    setSelectedStock
 } from "./BalanceSlice";
import {RootState} from "./../../../store";
import { AppDispatch } from "./../../../store";

const Balance_CC : React.FunctionComponent = () => {
    let [item, setItem] = useState({label : "", value : ""});
    let [toItem, setToItem] = useState(10);
    let [fromItem, setFromItem] = useState(0);

    let [stock, setStock] = useState({label : "", value : ""});
    let [toStock, setToStock] = useState(10);
    let [fromStock, setFromStock] = useState(0);

    const dispatch = useDispatch<AppDispatch>();

    const stockBalanceState = useSelector((state: RootState) => state.stock.balance);

    useEffect(() => {        
        // dispatch(fetchItems({ from : fromItem, to : toItem, name : itemName }));
        dispatch(fetchItems({ from : fromItem, to : toItem, name : item.label }));
    }, [toItem, fromItem]);

    useEffect(() => {
        // dispatch(setNewItems({from : fromItem, to : toItem, name : itemName }))
        dispatch(setNewItems({from : fromItem, to : toItem, name : item.label }))
    // }, [itemName]);
    }, [item]);


    useEffect(() => {
        // dispatch(fetchStocks({from : fromStock, to : toStock, name : stockName}));
        dispatch(fetchStocks({from : fromStock, to : toStock, name : stock.label}));

    }, [toStock, fromStock]);

    useEffect(() => {
        // dispatch(setNewStocks({from : fromStock, to : toStock, name : stockName }));
        dispatch(setNewStocks({from : fromStock, to : toStock, name : stock.label }));
    }, [stock]);
// }, [stockName]);


    const filterByName = {
        filterItemByName(inputValue : any) { 
            console.log(inputValue)
            setFromItem(0);
            setToItem(10);
            // setItemName(inputValue.key ?? "");
            setItem(item => ({label: inputValue.key ?? "", value : item.value})); 

        },
        filterStockByName(inputValue : any) {
            setFromStock(0);
            setToStock(10);
            // setStockName(inputValue.key ?? "");
            setStock(stock => ({label : inputValue.key ?? "", value : stock.value}));
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
                // setItemName(selectedOption.label);  
                setItem(selectedOption);  
                dispatch(setSelectedItem(selectedOption.value));
            }
        },
        handleStockChange(selectedOption: any) {
            if (selectedOption) {
                // setStockName(selectedOption.label);
                setStock(selectedOption);
                dispatch(setSelectedStock(selectedOption.value));
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