import React, { useState } from "react";
import MainMenuButton from "../Functional/MainMenuButton/MainMenuButton";
import Menu from "react-select/dist/declarations/src/components/Menu";
import './Sidebar.css';
import {SideMenuItem} from './SidebarTypes'



const Sidebar : React.FunctionComponent<{
    items : SideMenuItem[], 
    onMenuItemClick : (key : number) => void}
> = ({items, onMenuItemClick}) => {
    
    return (
        <div className="menu-items-column">
            {items.map(item => {
                return (
                    <MainMenuButton item={item} onMenuItemClick={onMenuItemClick}/>
                )
            })}
        </div>
    )
}

export default Sidebar;
