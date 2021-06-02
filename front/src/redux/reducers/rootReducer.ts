import { categoriesReducer } from "./categoriesReducer";

import { combineReducers } from "redux";


export const rootReducer=combineReducers({
  works: categoriesReducer,
})

