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
    setWithdrawalsEmpty,
    registerNewWithdrawal,
    getLatestWithdrawal 
} from "./WithdrawalSlice";
import { AppDispatch, RootState } from "./../../../store";
import Withdrawal from "./Withdrawal";
import { NewWithdrawal } from "./WithdrawalTypes";
import WithdrawalsHistory from "./WithdrawalsHistory";
import './Withdrawal_CC.css';


const Withdrawal_CC = () => {
    
    let [item, setItem] = useState({label : "", value : ""});
    let [toItem, setToItem] = useState(10);
    let [fromItem, setFromItem] = useState(0);
    
    let [stock, setStock] = useState({label : "", value : ""});
    let [toStock, setToStock] = useState(10);
    let [fromStock, setFromStock] = useState(0);

    const dispatch = useDispatch<AppDispatch>();
    const stockWithdrawalState = useSelector((state: RootState) => state.stock.withdrawal);
    const newItemId = useSelector((state : RootState) => state.stock.withdrawal.newWithdrawalId);
    
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

    useEffect(() => {        
        if (stockWithdrawalState.newWithdrawalId && stockWithdrawalState.newWithdrawalId.length > 0) {
            dispatch(setWithdrawalsEmpty());                        
            dispatch(getLatestWithdrawal({
                stockId : stockWithdrawalState.chosenStock?.id!, 
                inventoryItemId : stockWithdrawalState.chosenItem?.id!                
            }))
            dispatch(getWithdrawals({
                stockId : stockWithdrawalState.chosenStock?.id!, 
                inventoryItemId : stockWithdrawalState.chosenItem?.id!,
                from : 0,
                to : 3 // change to 10
            }))
        }
    }, [newItemId])

    interface WithdrawalData {
        date : string;
        amount : number
    }

    const handleModalSubmit = (withdrawalDataString : string) => {
        const {date, amount} : WithdrawalData = JSON.parse(withdrawalDataString);
        const isAmountInteger = Number.isInteger(amount);
        const newWithdrawal : NewWithdrawal = {
            stockId: stockWithdrawalState.chosenStock?.id!,
            inventoryItemId : stockWithdrawalState.chosenItem?.id!,
            withdrawalDate : date,
            amount : isAmountInteger ? amount : 0,
            amountForFractional : isAmountInteger ? 0.0 : amount,
            reason: "Другое"
        }
        dispatch(registerNewWithdrawal(newWithdrawal));
    }

    const handleChange = {
        handleItemChange(selectedOption: any) {
            if (selectedOption) {                           
                setItem(selectedOption);
                const selectedItem = stockWithdrawalState.items.find(i => i.id === selectedOption.value);
                dispatch(setSelectedItem(selectedItem!));
                console.log(stock.value)
                if (stock.value.length > 0) {  
                    dispatch(setWithdrawalsEmpty());                  
                    dispatch(getLatestWithdrawal({
                        stockId : stock.value, 
                        inventoryItemId : selectedOption.value
                    }))
                    dispatch(getWithdrawals({
                        stockId : stock.value, 
                        inventoryItemId : selectedOption.value,
                        from : 0,
                        to : 3
                    }));
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
                    dispatch(getLatestWithdrawal({
                        stockId : selectedOption.value, 
                        inventoryItemId : item.value
                    }))
                    dispatch(getWithdrawals({
                        stockId : selectedOption.value, 
                        inventoryItemId : item.value,
                        from : 0,
                        to : 3
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
        <div className="withdrawals-cc-container">
            <Withdrawal
                stockWithdrawalState={stockWithdrawalState}
                filterByName={filterByName}
                handleChange={handleChange}                               
                onMenuScrollDown={onMenuScrollDown} 
                handleModalSubmit={handleModalSubmit}
                withdrawals={stockWithdrawalState.withdrawals}
                latestWithdrawal={stockWithdrawalState.latestWithdrawal}
            />
            <div className="withdrawals-cc-history-container">
                <WithdrawalsHistory                
                    lastWithdrawalDate={stockWithdrawalState.latestWithdrawal?.withdrawalDate} 
                    withdrawals={stockWithdrawalState.withdrawals} 
                    onSearchClick={() => console.log("search")}
                />
            </div>
            
        </div>
        
    )
}

export default Withdrawal_CC;