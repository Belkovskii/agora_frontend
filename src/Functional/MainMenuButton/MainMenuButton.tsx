import React from "react";
import { MenuItem } from "../../Sidebar/Sidebar";
import './MainMenuButton.css';

const MainMenuButton : React.FunctionComponent<{item : MenuItem}> = ({item}) => {
    return (
        <div className="main-menu-button">
            <item.icon className="button-icon"/>
            <div className="label-text">{item.label}</div>
        </div>
    )
}

export default MainMenuButton;