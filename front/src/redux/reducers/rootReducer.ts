import { categoriesReducer } from "./categoriesReducer";
import { userReducer } from './userReducer';

import { combineReducers } from "redux";
import { workReducer } from "./workReducer";


export const rootReducer=combineReducers({
  works: categoriesReducer,
  userState: userReducer,
  work: workReducer,
})

