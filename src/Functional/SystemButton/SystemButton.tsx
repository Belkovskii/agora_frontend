import React from "react";
import './SystemButton.css'

const SystemButton : React.FunctionComponent<{
    onClickFunction : () => void,
    label : string
}> = ({onClickFunction, label}) => {
    return (
        <div className="systemButton" onClick={onClickFunction}>
            {label}
        </div>
    )
}

export default SystemButton;