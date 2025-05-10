import React, { useState } from "react";
import MainMenuButton from "../Functional/MainMenuButton/MainMenuButton";
import Menu from "react-select/dist/declarations/src/components/Menu";
import './Sidebar.css';
import {SideMenuItemButton} from './SidebarTypes'
import { NavLink } from "react-router-dom";



const Sidebar : React.FunctionComponent<{
    items : SideMenuItemButton[], 
    onMenuItemClick : (key : number) => void}
> = ({items, onMenuItemClick}) => {
    
    return (
        <div className="menu-items-column">
            {items.map(item => {
                return (
                    <NavLink to={item.url} 
                        className={({isActive}) => "nav-link" + (isActive ? "-selected" : "")}>
                        <MainMenuButton item={item} onMenuItemClick={onMenuItemClick}/>
                        <div className="selected-pointer"></div>
                    </NavLink>                    
                )
            })}
        </div>
    )
}

export default Sidebar;
