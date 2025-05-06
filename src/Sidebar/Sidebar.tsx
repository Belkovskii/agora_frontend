import React, { useState } from "react";
import MainMenuButton from "../Functional/MainMenuButton/MainMenuButton";
import Menu from "react-select/dist/declarations/src/components/Menu";
import {ReactComponent as StockIcon} from "./icons/stock.svg";
import {ReactComponent as CalendarIcon} from "./icons/calendar.svg";
import {ReactComponent as SalesIcon} from "./icons/sales.svg";
import {ReactComponent as CustomersIcon} from "./icons/customer.svg";
import {ReactComponent as TaskListIcon} from "./icons/tasklist.svg";
import './Sidebar.css';

const items : MenuItem[] = [
    {label : "Склад", isClicked : false, icon : StockIcon}, 
    {label : "Календарь", isClicked : false, icon : CalendarIcon},
    {label : "Задачи", isClicked : false, icon : TaskListIcon},
    {label : "Работа с клиентами", isClicked : false, icon : CustomersIcon},
    {label : "Продажи", isClicked : false, icon : SalesIcon},

];

export interface MenuItem {
    label : string,
    isClicked : boolean,
    icon : React.FunctionComponent<React.SVGProps<SVGSVGElement>>
}

const Sidebar = () => {
    return (
        <div className="menu-items-column">
            {items.map(item => {
                return (
                    <MainMenuButton item={item}/>
                )
            })}
        </div>
    )
}

export default Sidebar;
