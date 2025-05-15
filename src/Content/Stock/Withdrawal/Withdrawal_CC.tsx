import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { 
    fetchItems, 
    setNewItems, 
    fetchStocks, 
    setNewStocks, 
    getWithdrawals,
    setSelectedItem,
    setSelectedStock,
    setWithdrawalsEmpty
} from "./WithdrawalSlice";
import { AppDispatch, RootState } from "./../../../store";
import Withdrawal from "./Withdrawal";


const Withdrawal_CC = () => {
    
    let [item, setItem] = useState({label : "", value : ""});
    let [toItem, setToItem] = useState(10);
    let [fromItem, setFromItem] = useState(0);
    
    let [stock, setStock] = useState({label : "", value : ""});
    let [toStock, setToStock] = useState(10);
    let [fromStock, setFromStock] = useState(0);

    const dispatch = useDispatch<AppDispatch>();
    const stockWithdrawalState = useSelector((state: RootState) => state.stock.withdrawal);
    
    useEffect(() => {        
        dispatch(fetchItems({ from : fromItem, to : toItem, name : item.label }));
    }, [toItem, fromItem]);

    useEffect(() => {        
        dispatch(setNewItems({from : fromItem, to : toItem, name : item.label }))
    }, [item]);


    useEffect(() => {
        dispatch(fetchStocks({from : fromStock, to : toStock, name : stock.label}));

    }, [toStock, fromStock]);

    useEffect(() => {
        dispatch(setNewStocks({from : fromStock, to : toStock, name : stock.label }));
    }, [stock]);

    const handleChange = {
        handleItemChange(selectedOption: any) {
            if (selectedOption) {                           
                setItem(selectedOption);
                const selectedItem = stockWithdrawalState.items.find(i => i.id === selectedOption.value);
                dispatch(setSelectedItem(selectedItem!));
                console.log(stock.value)
                if (stock.value.length > 0) {  
                    dispatch(setWithdrawalsEmpty());                  
                    dispatch(getWithdrawals({
                        stockId : stock.value, 
                        inventoryItemId : selectedOption.value,
                        from : 0,
                        to : 1
                    }))
                }
            }
        },
        handleStockChange(selectedOption: any) {
            if (selectedOption) {
                setStock(selectedOption);
                const selectedStock = stockWithdrawalState.stocks.find(s => s.id === selectedOption.value);
                dispatch(setSelectedStock(selectedStock!));
                if (item.value.length > 0) {  
                    dispatch(setWithdrawalsEmpty());                  
                    dispatch(getWithdrawals({
                        stockId : selectedOption.value, 
                        inventoryItemId : item.value,
                        from : 0,
                        to : 1
                    }))
                }
            }
        }        
    }

    const filterByName = {
        filterItemByName(inputValue : any) { 
            setFromItem(0);
            setToItem(10);
            setItem(item => ({label: inputValue.key ?? "", value : item.value})); 

        },
        filterStockByName(inputValue : any) {
            setFromStock(0);
            setToStock(10);
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

    return (
        <Withdrawal
            stockWithdrawalState={stockWithdrawalState}
            filterByName={filterByName}
            handleChange={handleChange}                               
            onMenuScrollDown={onMenuScrollDown} 
        />
    )
}

export default Withdrawal_CC;