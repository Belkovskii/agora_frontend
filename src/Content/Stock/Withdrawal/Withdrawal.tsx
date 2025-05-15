import React from "react";
import InfiniteScrollWithSearch from "../../../Functional/InfiniteScrollWithSearch/InfiniteScrollWithSearch";
import { StockWithdrawalState } from "./WithdrawalTypes";
import './Withdrawal.css';

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

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('ru-RU', options);
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
    const getWithdrawalData = () => {
        if (stockWithdrawalState.withdrawals.length > 0) {
            const lastWithdrawal = stockWithdrawalState.withdrawals[0];
            const item = stockWithdrawalState.chosenItem;
            console.log('chosenItem :')
            console.log(item)
            const amount = lastWithdrawal.amount > 0 ? lastWithdrawal.amount : lastWithdrawal.amountForFractional;
            return (
                <div className="withdrawalData">
                    <span>Последнее списание: {amount} {item?.measurementUnit}.   {formatDate(lastWithdrawal.withdrawalDate)}</span>
                </div>
            )
        }
    }

    return (
        <div>
            <div className="headerText">
                <h1>Списания со склада</h1>
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
                <div className="withdrawalData">                
                    <span>{getWithdrawalData()}</span>
                </div>
            

            </div>
        </div>
    )
}

export default Withdrawal;