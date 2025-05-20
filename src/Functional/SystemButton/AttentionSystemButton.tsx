import React from "react";
import './AttentionSystemButton.css';

const AttentionSystemButton : React.FunctionComponent<{
    onClickFunction : () => void,
    label : string
}> = ({onClickFunction, label}) => {
    return (
        <div className="attentionSystemButton" onClick={onClickFunction}>
            {label}
        </div>
    )
}

export default AttentionSystemButton;