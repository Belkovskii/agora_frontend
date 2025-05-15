import React, {useState, useEffect} from "react"
import { StockBalanceState } from "./BalanceTypes"
import InfiniteScrollWithSearch from "../../../Functional/InfiniteScrollWithSearch/InfiniteScrollWithSearch";
import './Balance.css'

type FilterByNameFn = {
    filterItemByName : (value : any) => void,
    filterStockByName : (value : any) => void
}
type OnMenyScrollFn = {
    onItemMenuScrollDown : (from : number, to : number) => void,
    onStockMenuScrollDown : (from : number, to : number) => void
}    
type HandleChangeFn = {
    handleItemChange : (selectedOption: any) => void,
    handleStockChange : (selectedOption: any) => void
} 

const Balance : React.FunctionComponent<{ 
        stockBalanceState: StockBalanceState, 
        filterByName : FilterByNameFn,        
        handleChange : HandleChangeFn,        
        onMenuScrollDown : OnMenyScrollFn,
        balance : number
    }> = ({stockBalanceState, filterByName, handleChange, onMenuScrollDown, balance}) => {        
        
    const itemOptions  = stockBalanceState.items.map(item => ({ label: item.name, value: item.id }));
    const stockOptions  = stockBalanceState.stocks.map(stock => ({ label: stock.name, value: stock.id }));
    const {onItemMenuScrollDown, onStockMenuScrollDown} = onMenuScrollDown;
    const {filterItemByName, filterStockByName} = filterByName;
    const {handleItemChange, handleStockChange} = handleChange;

    return(
        <div>
            <div  className="headerText">
                <h1>Остатки товара</h1>
            </div>

            <div className="mainTextContainer">
                <div className="selectItemLabel">
                    <span>Выберите товар:</span>
                </div>
                <div className="itemScrollContainer">
                    <InfiniteScrollWithSearch
                        filterByInput = {filterItemByName}
                        handleSelect = {handleItemChange} 
                        options = {itemOptions}
                        handleCountChange = {onItemMenuScrollDown}
                    />
                </div>

                <div className="selectStockLabel">
                    <span>Выберите склад:</span>
                </div>
                <div className="stockScrollContainer">
                    <InfiniteScrollWithSearch
                        filterByInput = {filterStockByName}
                        handleSelect = {handleStockChange} 
                        options = {stockOptions}
                        handleCountChange = {onStockMenuScrollDown}
                    />
                </div>
                <div  className="itemsLeftSpan">
                    <span>Остаток товара на складе: {balance}</span>
                </div>
            </div>


        </div>
    )
}

export default Balance;