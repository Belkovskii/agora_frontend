import React from "react";
import { SubmenuItemButton } from "./SubmenuTypes";
import './SubmenuButton.css'

const SubmenuButton : React.FunctionComponent<{
    onSubmenuItemClick : (key : number) => void;
    item : SubmenuItemButton
}> = ({onSubmenuItemClick, item}) => {

    const getArrow = () => {
        if (item.isClicked) {
            return (
                <div className="arrow"></div>
            )
        }
    }

    return (
        <div className="btnContainer">
            <div className="buttonContainer" onClick={() => onSubmenuItemClick(item.key)}>
                {item.label}
            </div>
            {getArrow()}
        </div>
        
    )
}

export default SubmenuButton;
