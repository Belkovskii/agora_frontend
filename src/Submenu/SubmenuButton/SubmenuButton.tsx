import React from "react";
import { SubmenuItemButton } from "./SubmenuTypes";
import './SubmenuButton.css'

const SubmenuButton : React.FunctionComponent<{
    onSubmenuItemClick : (key : number) => void;
    item : SubmenuItemButton
}> = ({onSubmenuItemClick, item}) => {
    return (
        <div className="buttonContainer" onClick={() => onSubmenuItemClick(item.key)}>
            {item.label}
        </div>
    )
}

export default SubmenuButton;
