import React from "react";
import { Route, Routes } from "react-router-dom";
import Balance_CC from "./Stock/Balance/Balance_CC";

const Content = () => {
    return (
        <div>
            <Routes>
                <Route path='/stock/balance' element={<Balance_CC/>}/>
            </Routes>
        </div>
    )
}

export default Content;