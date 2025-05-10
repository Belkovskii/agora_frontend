import React from "react";
import { SubmenuItemButton } from "./SubmenuButton/SubmenuTypes";
import SubmenuButton from './SubmenuButton/SubmenuButton';
import './Submenu.css';

const Submenu : React.FunctionComponent<{
    onSubmenuItemClick : (key : number) => void;
    items : SubmenuItemButton[]
}> = ({onSubmenuItemClick, items}) => {
    return (
        <div className="submenuItemsContainer">
            {items.map(item => (
                
                <SubmenuButton onSubmenuItemClick={onSubmenuItemClick} item={item}/>
            
            ))}
        </div>
    )
}

export default Submenu;