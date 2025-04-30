import  {combineReducers} from 'redux'
import balanceReducer from "./Balance/BalanceSlice"

const stockReducer = combineReducers({
    balance : balanceReducer
});

export default stockReducer;