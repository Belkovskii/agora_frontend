import React from "react";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";


const items : MenuItem[] = [
    {label : "Склад", isClicked : false, icon : 'StockIcon', key : 1, submenuItems : [
        {label : "Остатки товаров", key : 10,  isClicked : false},
        {label : "Отгрузка товара", key : 11,  isClicked : false},
        {label : "Поступление товара", key : 12,  isClicked : false},
        {label : "Перечень товаров", key : 13,  isClicked : false},
        {label : "Перечень складов", key : 14,  isClicked : false}
    ]}, 
    {label : "Календарь", isClicked : false, icon : 'CalendarIcon', key : 2,  submenuItems : [
        {label : "Календарь", key : 21,  isClicked : false}
    ]},
    {label : "Задачи", isClicked : false, icon : 'TaskListIcon', key : 3,  submenuItems : [
        {label : "Задачи сотрудника", key : 31,  isClicked : false},
        {label : "Kanban", key : 1,  isClicked : false}
    ]},
    {label : "Работа с клиентами", isClicked : false, icon : 'CustomersIcon', key : 4,  submenuItems : [
        {label : "Контакты клиентов", key : 41,  isClicked : false},
        {label : "Стадии работы с клиентами", key : 42,  isClicked : false},
        {label : "Клиенты - ответственные", key : 43,  isClicked : false}
    ]},
    {label : "Продажи", isClicked : false, icon : 'SalesIcon', key : 5,  submenuItems : [
        {label : "История продаж", key : 51,  isClicked : false},
        {label : "Планируемые продажи", key : 52,  isClicked : false},
        {label : "Заявки", key : 53,  isClicked : false}
    ]},
];

export interface SubmenuItem {
    label : string,
    isClicked : boolean,  
    key : number  
}

export interface MenuItem {
    label : string,
    isClicked : boolean,
    icon : string, //React.FunctionComponent<React.SVGProps<SVGSVGElement>>   
    key : number, 
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
