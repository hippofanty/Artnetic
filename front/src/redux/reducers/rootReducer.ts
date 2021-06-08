import { combineReducers } from "redux";

import { userReducer } from './userReducer';
import { categoriesReducer } from "./categoriesReducer";
import { workReducer } from "./workReducer";
import { myWorksReducer } from "./myWorksReducer";
import { artistsReducer } from "./artistsReducer";
import { ordersReducer } from "./ordersReducer";
import { oneArtistWorksReducer } from "./oneArtistWorksReducer";


export const rootReducer=combineReducers({
  works: categoriesReducer,
  userState: userReducer,
  work: workReducer,
  myWorks: myWorksReducer,
  artists: artistsReducer,
  ordersState: ordersReducer,
  oneArtistWorks: oneArtistWorksReducer,
})

