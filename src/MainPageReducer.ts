import React from "react";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";


const items : MenuItem[] = [
    {label : "Склад", isClicked : false, icon : 'StockIcon', url : "/stock/balance", key : 1, submenuItems : [
        {label : "Остатки товаров", key : 10,  isClicked : false, url : "/stock/balance"},
        {label : "Отгрузка товара", key : 11,  isClicked : false, url : "/stock/withdrawal"},
        {label : "Поступление товара", key : 12,  isClicked : false, url : "/stock/receipts"},
        {label : "Перечень товаров", key : 13,  isClicked : false, url : "/stock/itemslist"},
        {label : "Перечень складов", key : 14,  isClicked : false, url : "/stock/stocklist"}
    ]}, 
    {label : "Календарь", isClicked : false, icon : 'CalendarIcon', url : "/calendar/calendar", key : 2,  submenuItems : [
        {label : "Календарь", key : 21,  isClicked : false, url : "/calendar/calendar"}
    ]},
    {label : "Задачи", isClicked : false, icon : 'TaskListIcon', url : "/tasks/employeetasks", key : 3,  submenuItems : [
        {label : "Задачи сотрудника", key : 31,  isClicked : false, url : "/tasks/employeetasks"},
        {label : "Kanban", key : 1,  isClicked : false, url : "/tasks/kanban"}
    ]},
    {label : "Работа с клиентами", isClicked : false, icon : 'CustomersIcon', url : "/clients/contacts", key : 4,  submenuItems : [
        {label : "Контакты клиентов", key : 41,  isClicked : false, url : "/clients/contacts"},
        {label : "Стадии работы с клиентами", key : 42,  isClicked : false, url : "/clients/stages"},
        {label : "Клиенты - ответственные", key : 43,  isClicked : false, url : "/clients/respnsible"}
    ]},
    {label : "Продажи", isClicked : false, icon : 'SalesIcon', url : "/sales/history", key : 5,  submenuItems : [
        {label : "История продаж", key : 51,  isClicked : false, url : "/sales/history"},
        {label : "Планируемые продажи", key : 52,  isClicked : false, url : "/sales/plan"},
        {label : "Заявки", key : 53,  isClicked : false, url : "/sales/requests"}
    ]},
];

export interface SubmenuItem {
    label : string,
    isClicked : boolean,  
    key : number,
    url : string  
}

export interface MenuItem {
    label : string,
    isClicked : boolean,
    icon : string, //React.FunctionComponent<React.SVGProps<SVGSVGElement>>   
    key : number, 
    url : string,
    submenuItems : SubmenuItem[]
}

const initialState : {menu : MenuItem[]} = {
    menu : items
}

/*
const mainPageMenuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        setMenuItemClicked(state, action: PayloadAction<number>) {
            const clickedMenuItemKey = action.payload;
            return {...state, menu : state.menu.map(item => {
                if (item.key === clickedMenuItemKey) {   
                    const newSubmenuItems =  item.submenuItems; 
                    newSubmenuItems[0].isClicked = true;                              
                    return {
                        ...item, 
                        isClicked : true, 
                        submenuItems : [...newSubmenuItems]
                    }                     
                } else { 
                    return {
                        ...item, 
                        isClicked : false, 
                        submenuItems : item.submenuItems.map(si => ({...si, isClicked : false}))
                    }
                }})
            }
        },
        setSubmenuItemClicked(state, action: PayloadAction<number>) {
            const submenuItemKey = action.payload;
            return {
                ...state,
                menu: state.menu.map(item => {
                    const newSubmenuItems = item.submenuItems.map(subitem => ({
                        ...subitem,
                        isClicked: subitem.key === submenuItemKey
                    }));
        
                    return {
                        ...item,
                        isClicked: newSubmenuItems.some(subitem => subitem.isClicked),
                        submenuItems: newSubmenuItems
                    };
                })
            };
        }
    }
});
*/

const mainPageMenuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
      setMenuItemClicked(state, action: PayloadAction<number>) {
        const clickedMenuItemKey = action.payload;
        state.menu = state.menu.map(item => {
          if (item.key === clickedMenuItemKey) {
            const newSubmenuItems = [...item.submenuItems];
            if (newSubmenuItems.length > 0) {
              newSubmenuItems[0] = { ...newSubmenuItems[0], isClicked: true };
            }
            return {
              ...item,
              isClicked: true,
              submenuItems: newSubmenuItems
            };
          } else {
            return {
              ...item,
              isClicked: false,
              submenuItems: item.submenuItems.map(si => ({ ...si, isClicked: false }))
            };
          }
        });
      },
      
      setSubmenuItemClicked(state, action: PayloadAction<number>) {
        const submenuItemKey = action.payload;
        state.menu = state.menu.map(item => {
          const newSubmenuItems = item.submenuItems.map(subitem => ({
            ...subitem,
            isClicked: subitem.key === submenuItemKey
          }));
          return {
            ...item,
            isClicked: newSubmenuItems.some(subitem => subitem.isClicked),
            submenuItems: newSubmenuItems
          };
        });
      }
    }
  });

export const { setMenuItemClicked, setSubmenuItemClicked } = mainPageMenuSlice.actions;
export default mainPageMenuSlice.reducer;
