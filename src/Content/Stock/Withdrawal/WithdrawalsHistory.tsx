import React, {useState, useEffect} from "react";
import { Withdrawal } from "./WithdrawalTypes";
import './WithdrawalsHistory.css'
import FromDateToDate from "./FromDateToDate";


function formatDate(dateString: string): string {
    const months: string[] = [
        "января", "февраля", "марта", "апреля", "мая", "июня",
        "июля", "августа", "сентября", "октября", "ноября", "декабря"
    ];
    const date = new Date(dateString);
    const day = date.getUTCDate();
    const month = months[date.getUTCMonth()];
    const year = date.getUTCFullYear();
    return `${day} ${month} ${year} г.`;
}

const handleFromDateChange = () => {

}

const handleToDateChange = () => {

}

function formatDateString(input: string): string {
    const date = new Date(input);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}


const WithdrawalsHistory : React.FunctionComponent<{
    lastWithdrawalDate : string | undefined,
    withdrawals : Withdrawal[],
    onSearchClick : () => void
}> = ({
    lastWithdrawalDate,
    withdrawals,
    onSearchClick,
}) => {

    const [from, setFrom] = useState(formatDateString(lastWithdrawalDate!));
    const [to, setTo] = useState(10); 

    if (withdrawals && withdrawals.length > 0) {
        return (
            <div className="w-history-container">
                <h1>История списаний</h1>
                <div className="from-to-dates">
                    <FromDateToDate/>
                </div>


                <div className="table-container">
                    <div className="date-input-continer">
                        <div className="from-date-input-">
                            <input 
                                type="date" 
                                id="from-date-input" 
                                className="fromDateInput"
                                onChange={handleFromDateChange}
                                value={formatDateString(lastWithdrawalDate!)}
                            />
                        </div>
                        <div className="from-date-input-">
                            <input 
                                type="date" 
                                id="to-date-input" 
                                className="toDateInput"
                                onChange={handleToDateChange}
                            />
                    </div>
                </div>
                    <table className="withdrawal-table">
                        <thead>
                            <tr>
                                <th>Дата списания</th>
                                <th>Количество</th>                            
                            </tr>
                        </thead>
                        <tbody>
                            {withdrawals.map(withdrawal => {
                                const amount = withdrawal.amountForFractional > 0 ?  
                                    withdrawal.amountForFractional : withdrawal.amount;
                                    return (
                                        <tr key={withdrawal.id}>
                                            <td>{formatDate(withdrawal.withdrawalDate)}</td>
                                            <td>{amount}</td>                                
                                        </tr>
                                    )
                                }   
                            )}
                        </tbody>
                    </table>                    
                </div>
            </div>
        )
    } else {
        return (<div></div>)
    }
}

export default WithdrawalsHistory;