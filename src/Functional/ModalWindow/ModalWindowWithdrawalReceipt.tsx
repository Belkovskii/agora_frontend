import React, {useState} from "react";
import './ModalWindowWithdrawalReceipt.css';
import SystemButton from "../SystemButton/SystemButton";
import AttentionSystemButton from "../SystemButton/AttentionSystemButton";

const ModalWindowWithdrawalReceipt : React.FunctionComponent<{
    isAcitve : boolean,
    isWithdrawal : boolean,
    itemCountUnit : string,
    onSubmit : (data : string) => void,
    onReject : () => void
}>= ({
    isAcitve,
    isWithdrawal,
    itemCountUnit,
    onSubmit,
    onReject
}) => {

    const [date, setDate] = useState("");
    const [amount, setAmount] = useState(0);

    const getDateLabel = () => isWithdrawal ? 
        <span className="dateLabel">Дата списания товара: </span> : 
        <span className="dateLabel">Дата поступления товара: </span>
    
    const getAmountLabel = () => isWithdrawal ?
        <span className="amountLabel">Списать {itemCountUnit} товара в количестве: </span> : 
        <span className="amountLabel">Зарегистрировать поступление {itemCountUnit} товара в количестве: </span>

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate(date => event.target.value);
    }
    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(amount =>  Number(event.target.value));
    }

    const handleSubmit = () => {
        onSubmit(JSON.stringify({date, amount}))
        setDate("");
        setAmount(0);
        onReject();
    }

    const handleReject = () => {
        setDate("");
        setAmount(0);
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
                            <div className="amountInputArea">
                                {getAmountLabel()}
                                <input
                                    type="number"
                                    className="amountInput"
                                    onChange={handleAmountChange}
                                    />
                            </div>                                                                              
                        </div>
                        <div className="buttons">
                            <SystemButton 
                                label="Зарегистрировать" 
                                onClickFunction={handleSubmit}
                                disabled={amount === 0 || date === ""}
                            />
                            <AttentionSystemButton label="Отменить" onClickFunction={handleReject}/>
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