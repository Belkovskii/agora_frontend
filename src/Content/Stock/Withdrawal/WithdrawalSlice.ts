import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Item, Stock } from "../StockTypes";
import connectionData from "../../../Connection";
import { StockWithdrawalState, Withdrawal, NewWithdrawal } from "./WithdrawalTypes";
import { stat } from "fs";

const initialState = new StockWithdrawalState();

const fetchItems = createAsyncThunk<Item[], { from: number; to: number, name : string }>(
    'stockWithdrawal/fetchItems', 
    async ({ from, to, name }) => {
        const endpoint = `${connectionData.host}/InventoryItem/get-list?Name=${name}&OrderBy=Name&Asc=true&From=${from}&To=${to}`;
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        return data.map((item: any) => ({
            id: item.id,
            name: item.name,
            measurementUnit: item.stockMeasurementUnit || "",
            createdAt: item.createdAt,
            description: item.description,            
        }));
    }
);

const setNewItems = createAsyncThunk<Item[], { from: number; to: number, name : string }>(
    'stockWithdrawal/setNewItems', 
    async ({ from, to, name }) => {
        const endpoint = `${connectionData.host}/InventoryItem/get-list?Name=${name}&OrderBy=Name&Asc=true&From=${from}&To=${to}`;
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        return data.map((item: any) => ({
            id: item.id,
            name: item.name,
            measurementUnit: item.stockMeasurementUnit || "",
            createdAt: item.createdAt.trim(),
            description: item.description
        }));
    }
);

const fetchStocks = createAsyncThunk<Stock[], { from: number; to: number, name : string }>(
    'stockWithdrawal/fetchStocks', 
    async ({ from, to, name }) => {
        const endpoint = `${connectionData.host}/Stock/Get-list?Name=${name}&OrderBy=Name&Asc=true&From=${from}&To=${to}`;
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        return data.map((stock: any) => ({
            id : stock.id,
            name : stock.name,
            address : stock.address || "",
            contact : stock.contact || "",
        }));
    }
);

const setNewStocks = createAsyncThunk<Stock[], { from: number; to: number, name : string }>(
    'stockWithdrawal/setNewStocks', 
    async ({ from, to, name }) => {
        const endpoint = `${connectionData.host}/Stock/Get-list?Name=${name}&OrderBy=Name&Asc=true&From=${from}&To=${to}`;
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        return data.map((stock: any) => ({
            id : stock.id,
            name : stock.name,
            address : stock.address || "",
            contact : stock.contact || "",
        }));
    }
);

const getLatestWithdrawal = createAsyncThunk<Withdrawal, {stockId : string, inventoryItemId : string}>(
    'stockWithdrawal/getLatestWithdrawal',
    async ({stockId, inventoryItemId}) => {
        const endpoint = `${connectionData.host}/Withdrawal/get-list`;
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                stockId,
                inventoryItemId,
                from : 0,
                to : 1
             })
        })
        if (!response.ok) {
            console.log(`response.statusText: ${response.statusText}`)
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(`data: ${data}`)
        return data.map((withdrawal: any) => ({
            id : withdrawal.id,
            stockId: withdrawal.stockId,
            inventoryItemId : withdrawal.inventoryItemId,
            withdrawalDate : withdrawal.withdrawalDate,
            amount : withdrawal.amount,
            amountForFractional : withdrawal.amountForFractional,
            reason: withdrawal.reason
        }))[0];
    }
)

const getWithdrawals = createAsyncThunk<Withdrawal[], {stockId : string, inventoryItemId : string, from : number, to : number}>(
    'stockWithdrawal/getWithdrawals',
    async ({stockId, inventoryItemId, from, to}) => {        
        const endpoint = `${connectionData.host}/Withdrawal/get-list`;
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                stockId,
                inventoryItemId,
                from,
                to
             })
        })
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        return data.map((withdrawal: any) => ({
            id : withdrawal.id,
            stockId: withdrawal.stockId,
            inventoryItemId : withdrawal.inventoryItemId,
            withdrawalDate : withdrawal.withdrawalDate,
            amount : withdrawal.amount,
            amountForFractional : withdrawal.amountForFractional,
            reason: withdrawal.reason
        })).sort((a : Withdrawal, b : Withdrawal) => {
            const dateA = new Date(a.withdrawalDate);
            const dateB = new Date(b.withdrawalDate);
            if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
                throw new Error('Некорректный формат даты');
            }   
            return dateB.getTime() - dateA.getTime();
        });
    }
);

const registerNewWithdrawal = createAsyncThunk<{newWithdrawalId : string}, NewWithdrawal>(
    'stockWithdrawal/createWithdrawal',
    async ({stockId, inventoryItemId, withdrawalDate, amount, amountForFractional, reason}) => {    
        const endpoint = `${connectionData.host}/Withdrawal`;
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                stockId,
                inventoryItemId,
                withdrawalDate,
                amount, 
                amountForFractional,
                reason
             })
        })
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        return {newWithdrawalId : data.newWithdrawalId};
    }
)

const stockWithdrawalSlice = createSlice({
    name : "stockWithdrawal",
    initialState,
    reducers : {
        setSelectedItem(state, action: PayloadAction<Item>) : void {                        
            state.chosenItem = action.payload;
        },
        setSelectedStock(state, action: PayloadAction<Stock>) : void {
            state.chosenStock = action.payload;
        },
        setWithdrawalsEmpty(state, action: PayloadAction<void>) : void {
            state.withdrawals = [];
        }
    },
    extraReducers : builder => { builder
        .addCase(fetchItems.fulfilled, (state, action) => {            
            return {...state, items : 
                [
                    ...state.items, 
                    ...(action.payload.filter(newItem => {
                    return !state.items.find(oldItem => oldItem.id == newItem.id)
                }))
                ]
            }        
        })
        .addCase(setNewItems.fulfilled, (state, action) => {
            return {...state, items : [...action.payload]};
            })
        .addCase(fetchStocks.fulfilled, (state, action) => {
            return {...state, stocks :
                [
                    ...state.stocks,
                    ...(action.payload.filter(newStock => {
                        return !state.stocks.find(oldStock => oldStock.id == newStock.id)
                    }))
                ]
            }
        })
        .addCase(setNewStocks.fulfilled, (state, action) => {
            return {...state, stocks : [...action.payload]}
        })
        .addCase(getWithdrawals.fulfilled, (state, action) => {            
            return {...state, withdrawals : [...state.withdrawals, ...action.payload]}
        })
        .addCase(getLatestWithdrawal.fulfilled, (state, action) => {
            return {...state, latestWithdrawal : action.payload}
        })
        .addCase(registerNewWithdrawal.fulfilled, (state, action) => {
            return {...state, newWithdrawalId : action.payload.newWithdrawalId}           
        })      
    }
})

export {
    fetchItems, 
    setNewItems, 
    fetchStocks, 
    setNewStocks, 
    getWithdrawals, 
    registerNewWithdrawal,
    getLatestWithdrawal
};
export const { setSelectedItem, setSelectedStock, setWithdrawalsEmpty} = stockWithdrawalSlice.actions;
export default stockWithdrawalSlice.reducer;
