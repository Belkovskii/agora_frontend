import React from "react";
import { SubmenuItemButton } from "./SubmenuButton/SubmenuTypes";
import SubmenuButton from './SubmenuButton/SubmenuButton';
import './Submenu.css';
import { NavLink } from "react-router-dom";

const Submenu : React.FunctionComponent<{
    onSubmenuItemClick : (key : number) => void;
    items : SubmenuItemButton[]
}> = ({onSubmenuItemClick, items}) => {
    return (
        <div className="submenuItemsContainer">
            {items.map(item => (
                <NavLink to={item.url} className={({isActive})=> "submenu-nav-link" + (isActive? "-active" : "")}>
                    <SubmenuButton onSubmenuItemClick={onSubmenuItemClick} item={item}/>
                </NavLink>                            
            ))}
        </div>
    )
}

export default Submenu;