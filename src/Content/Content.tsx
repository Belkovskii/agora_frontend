import React from "react";
import { Route, Routes } from "react-router-dom";
import Balance_CC from "./Stock/Balance/Balance_CC";
import Withdrawal_CC from "./Stock/Withdrawal/Withdrawal_CC";

const Content = () => {
    return (
        <div>
            <Routes>
                <Route path='/stock/balance' element={<Balance_CC/>}/>
                <Route path='/stock/withdrawal' element={<Withdrawal_CC/>}/>
            </Routes>
        </div>
    )
}

export default Content;