import { categoriesReducer } from "./categoriesReducer";
import { userReducer } from './userReducer';

import { combineReducers } from "redux";


export const rootReducer=combineReducers({
  works: categoriesReducer,
  userState: userReducer,
})

