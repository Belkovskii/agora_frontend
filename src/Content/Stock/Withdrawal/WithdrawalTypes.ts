import { Item, Stock } from "../StockTypes";

export interface Withdrawal {
    id : string,
    stockId: string,
    inventoryItemId : string;
    withdrawalDate : string;
    amount : number;
    amountForFractional : number;
}

export interface NewWithdrawal {    
    stockId: string,
    inventoryItemId : string;
    withdrawalDate : string;
    amount : number;
    amountForFractional : number;
}

export class StockWithdrawalState {
    items : Item[] = [];
    stocks : Stock[] = [];
    chosenItem : Item | null = null;
    chosenStock : Stock | null = null;
    withdrawals : Withdrawal[] = [];
    newWithdrawal : Withdrawal | null = null;
}