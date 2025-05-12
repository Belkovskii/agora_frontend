import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import stockReducer from './Content/Stock/StockReducer';
import mainMenuReducer from './MainPageReducer';
import withdrawalReducer from './Content/Stock/StockReducer'


const rootReducer = combineReducers({
  stock : stockReducer,
  withdrawal : withdrawalReducer, 
  mainMenu : mainMenuReducer
});

const store = configureStore({
  reducer : rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export default store;