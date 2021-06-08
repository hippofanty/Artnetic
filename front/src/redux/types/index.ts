// any types here
import { Id, Work, Artist, ApprovedOrder } from "../init";

export enum Types {
  GET_CATEGORIES = "GET_CATEGORIES",
  SET_USER = "SET_USER",
  UNSET_USER = "UNSET_USER",
  GET_WORK = "GET_WORK",
  GET_MY_WORKS = "GET_MY_WORKS",
  DELETE_WORK = "DELETE_WORK",

  ADD_MY_WORK = "ADD_MY_WORK",

  ADD_FAVOURITE_WORK = "ADD_FAVOURITE_WORK",
  REMOVE_FAVOURITE_WORK = "REMOVE_FAVOURITE_WORK",
  SET_FAVOURITE_WORK = "SET_FAVOURITE_WORK",
  GET_ARTISTS = "GET_ARTISTS",
  UNSET_FAVOURITE_WORK = "UNSET_FAVOURITE_WORK",

  SET_APPROVED_ORDERS = "SET_APPROVED_ORDERS",
  GET_APPROVED_ORDERS = "GET_APPROVED_ORDERS",
  GET_ONE_ARTIST_WORKS = "GET_ONE_ARTIST_WORKS",
}

export interface SetUserAction {
  type: Types.SET_USER;
  payload: {
    id: string;
    email: string;
    username: string;
    role: string;
  };
}

export interface UnsetUserAction {
  type: Types.UNSET_USER;
  payload: {
    id: string;
    email: string;
    username: string;
    role: string;
  };
}
export interface getWorksAction {
  type: Types.GET_CATEGORIES;
  payload: Work[];
}
export interface getMyWorksAction {
  type: Types.GET_MY_WORKS;
  payload: Work[];
}
export interface GetOneArtistWorksAction {
  type: Types.GET_ONE_ARTIST_WORKS;
  payload: Work[];
}
export interface addMyWorkAction {
  type: Types.ADD_MY_WORK;
  payload: Work;
}

export interface getOneWorkAction {
  type: Types.GET_WORK;
  payload: Work;
}
export interface deleteWorkAction {
  type: Types.DELETE_WORK;
  payload: string;
}

export interface addFavouriteWork {
  type: Types.ADD_FAVOURITE_WORK;
  payload: Work;
}

export interface removeFavouriteWork {
  type: Types.REMOVE_FAVOURITE_WORK;
  payload: Id;
}
export interface setFavouriteWorks {
  type: Types.SET_FAVOURITE_WORK;
  payload: Work[];
}
export interface getArtistsAction {
  type: Types.GET_ARTISTS;
  payload: Artist[];
}

export interface unsetFavouriteWorks {
  type: Types.UNSET_FAVOURITE_WORK;
  payload: Work[];
}

export interface SetApprovedOrders {
  type: Types.SET_APPROVED_ORDERS;
  payload: ApprovedOrder[];
}

export interface GetApprovedOrders {
  type: Types.GET_APPROVED_ORDERS;
  payload: ApprovedOrder[];
}

export type Actions =
  | getWorksAction
  | SetUserAction
  | UnsetUserAction
  | getOneWorkAction
  | getMyWorksAction
  | deleteWorkAction
  | addMyWorkAction
  | addFavouriteWork
  | setFavouriteWorks
  | getArtistsAction
  | unsetFavouriteWorks
  | removeFavouriteWork
  | SetApprovedOrders
  | GetApprovedOrders
  | GetOneArtistWorksAction;
