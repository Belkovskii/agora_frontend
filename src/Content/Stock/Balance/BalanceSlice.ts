import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import connectionData from "../../../Connection";
import { StockBalanceState } from "./BalanceTypes";
import { Item, Stock, StockBalance } from "../StockTypes";

const initialState = new StockBalanceState();

const fetchItems = createAsyncThunk<Item[], { from: number; to: number, name : string }>(
    'stockBalance/fetchItems', 
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
            description: item.description
        }));
    }
);

const setNewItems = createAsyncThunk<Item[], { from: number; to: number, name : string }>(
    'stockBalance/setNewItems', 
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
    'stockBalance/fetchStocks', 
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
    'stockBalance/setNewStocks', 
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

const retrieveBalance = createAsyncThunk<StockBalance, {stockId : string, itemId : string}>(
    'stockBalance/retrieveBalance',
    async ({stockId, itemId}) => {        
        const endpoint = `${connectionData.host}/StockBalance/${itemId}/${stockId}`;
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    }
)

const stockBalanceSlice = createSlice({
  name: 'stockBalance',
  initialState,
  reducers: {
    setSelectedItem(state, action: PayloadAction<string>) : StockBalanceState {        
        return {...state, chosenItemId : action.payload}
    },
    setSelectedStock(state, action: PayloadAction<string>) : StockBalanceState {
        return {...state, chosenStockId : action.payload}
    },
    setItemsLeftZero(state, action: PayloadAction<void>) : StockBalanceState {
        console.log(106)
        return {...state, itemsLeft : 0}
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchItems.fulfilled, (state, action) => {            
        return {...state, items : 
            [
                ...state.items, 
                ...(action.payload.filter(newItem => {
                    return !state.items.find(oldItem => oldItem.id == newItem.id)
                }))
            ]
        }        
    }).addCase(setNewItems.fulfilled, (state, action) => {        
        return {...state, items : [...action.payload]};
    }).addCase(fetchStocks.fulfilled, (state, action) => {
        return {...state, stocks :
            [
                ...state.stocks,
                ...(action.payload.filter(newStock => {
                    return !state.stocks.find(oldStock => oldStock.id == newStock.id)
                }))
            ]
        }
    }).addCase(setNewStocks.fulfilled, (state, action) => {
        return {...state, stocks : [...action.payload]}
    }).addCase(retrieveBalance.fulfilled, (state, action) => {
        return {...state, itemsLeft : action.payload.balance}
    });
}});

export  { fetchItems, setNewItems, fetchStocks, setNewStocks, retrieveBalance };
export const {setSelectedItem, setSelectedStock, setItemsLeftZero} = stockBalanceSlice.actions
export default stockBalanceSlice.reducer;