import { Item } from "../StockTypes";
import { Stock } from "../StockTypes";

export class StockBalanceState {
    items : Item[] = [];
    stocks : Stock[] = [];
    chosenItemId : string = "";
    chosenStockId : string = "";
    itemsLeft : number = 0;
    latestWithdrawal : string | null = null;
    latestReceipt : string | null = null;
    itemDescription : string = "";
}