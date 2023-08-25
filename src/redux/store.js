import { configureStore, combineReducers } from "@reduxjs/toolkit";
import currencyReducer from "./currencyReducer";


let reducers = combineReducers({
    mainPage: currencyReducer
})

let store = configureStore({
    reducer: reducers
})

export default store;