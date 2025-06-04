import React from "react";
import './SystemButton.css'

const SystemButton : React.FunctionComponent<{
    onClickFunction : () => void,
    label : string,
    disabled : boolean
}> = ({onClickFunction, label, disabled}) => {
    const className = "systemButton" + (disabled ? " disabled" : "");
    return (
        <div 
            className={className} 
            onClick={() => !disabled && onClickFunction() }>
            {label}
        </div>
    )
}

export default SystemButton;