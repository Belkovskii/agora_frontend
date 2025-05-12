import React from "react";
import InfiniteScrollWithSearch from "../../../Functional/InfiniteScrollWithSearch/InfiniteScrollWithSearch";
import { StockWithdrawalState } from "./WithdrawalTypes";

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

const Withdrawal: React.FunctionComponent<{ 
        stockWithdrawalState: StockWithdrawalState, 
        filterByName : FilterByNameFn,        
        handleChange : HandleChangeFn,        
        onMenuScrollDown : OnMenyScrollFn,        
    }> = ({stockWithdrawalState, filterByName, handleChange, onMenuScrollDown}) => {

    const itemOptions  = stockWithdrawalState.items.map(item => ({ label: item.name, value: item.id }));
    const stockOptions  = stockWithdrawalState.stocks.map(stock => ({ label: stock.name, value: stock.id }));
    const {onItemMenuScrollDown, onStockMenuScrollDown} = onMenuScrollDown;
    const {filterItemByName, filterStockByName} = filterByName;
    const {handleItemChange, handleStockChange} = handleChange;

    return (
        <div>
            <div>
                <h1>Списания со склада</h1>
            </div>
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
            
        </div>
    )
}

export default Withdrawal;