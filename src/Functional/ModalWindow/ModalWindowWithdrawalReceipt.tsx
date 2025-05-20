import React, {useState} from "react";
import './ModalWindowWithdrawalReceipt.css';
import SystemButton from "../SystemButton/SystemButton";
import AttentionSystemButton from "../SystemButton/AttentionSystemButton";

const ModalWindowWithdrawalReceipt : React.FunctionComponent<{
    isAcitve : boolean,
    isWithdrawal : boolean,
    onSubmit : (data : string) => void,
    onReject : () => void
}>= ({
    isAcitve,
    isWithdrawal,
    onSubmit,
    onReject
}) => {

    const [date, setDate] = useState("");
    const getDateLabel = () => isWithdrawal ? 
        <span className="dateLabel">Дата списания товара: </span> : 
        <span className="dateLabel">Дата поступления товара: </span>

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate(date => event.target.value);
    }

    const handleSubmit = () => {
        onSubmit(JSON.stringify({date}))
        onReject();
    }

    const getModalContent = () => {
        if (isAcitve) {
            return(
                <div className="modalContainer">
                    <div className="modalContent">
                        <div className="inputArea">
                            <div className="dateInputArea">
                                {getDateLabel()}
                                <input 
                                    type="date" 
                                    id="date" 
                                    className="dateInput"
                                    onChange={handleDateChange}
                                />
                            </div>                                                                               
                        </div>
                        <div className="buttons">
                            <SystemButton label="Зарегистрировать" onClickFunction={handleSubmit}/>
                            <AttentionSystemButton label="Отменить" onClickFunction={onReject}/>
                        </div>
                    </div>
                </div>
            )
        }
    }

    return (
        <div>
            {getModalContent()}
        </div>
    )
   
}

export default ModalWindowWithdrawalReceipt;