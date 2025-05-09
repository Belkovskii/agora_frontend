import React from "react";
import './MainMenuButton.css';
import { SideMenuItem } from "../../Sidebar/SidebarTypes";

const MainMenuButton : React.FunctionComponent<{
    item : SideMenuItem, 
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