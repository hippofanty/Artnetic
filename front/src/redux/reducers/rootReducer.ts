import { categoriesReducer } from "./categoriesReducer";
import { userReducer } from './userReducer';

import { combineReducers } from "redux";
import { workReducer } from "./workReducer";
import { myWorksReducer } from "./myWorksReducer";
import { artistsReducer } from "./artistsReducer";


export const rootReducer=combineReducers({
  works: categoriesReducer,
  userState: userReducer,
  work: workReducer,
  myWorks: myWorksReducer,
  artists: artistsReducer,
})

