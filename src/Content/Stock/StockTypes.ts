export interface Stock {
    id : string,
    name : string,
    address : string,
    contact : string
}

export interface Item {
    id : string,
    name : string,
    measurementUnit : string,
    createdAt : Date
}

export interface StockBalance {
    id: string,
    inventoryItemId: string,
    stockId: string,
    balance: number,
    balanceForFractional: number
}