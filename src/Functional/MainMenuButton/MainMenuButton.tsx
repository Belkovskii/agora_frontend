import React from "react";
import './MainMenuButton.css';
import { SideMenuItemButton } from "../../Sidebar/SidebarTypes";

const MainMenuButton : React.FunctionComponent<{
    item : SideMenuItemButton, 
    onMenuItemClick : (key : number) => void
}> = ({item, onMenuItemClick}) => {
    return (
        <div className="main-menu-button" onClick={()=>onMenuItemClick(item.value)}>
            <item.icon className="button-icon"/>
            <div className="label-text">{item.label}</div>
        </div>
    )
}

export default MainMenuButton;