import  {combineReducers} from 'redux'
import balanceReducer from "./Balance/BalanceSlice"
import withdrawalReducer from './Withdrawal/WithdrawalSlice';

const stockReducer = combineReducers({
    balance : balanceReducer,
    withdrawal : withdrawalReducer
});

export default stockReducer;