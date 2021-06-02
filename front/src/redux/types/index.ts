// any types here
import {  Work } from "../init";

export enum Types {
  GET_CATEGORIES = "GET_CATEGORIES",
  SET_USER = 'SET_USER',
  UNSET_USER = 'UNSET_USER',
}

export interface SetUserAction {
  type: Types.SET_USER;
  payload: {
    id: string,
    email: string,
    username: string,
    // role: string,
    token: string,
  };
}
export interface getWorksAction {
  type: Types.GET_CATEGORIES;
  payload: Work[];
}
export type Actions =
  | getWorksAction
  | SetUserAction





  
/*import { Id, Todo } from "../init";

export enum Types {
  ADD_TODO = "ADD_TODO",
  EDIT_TODO = "EDIT_TODO",
  DELETE_TODO = "DELETE_TODO",
  SET_STATUS_TODO = "SET_STATUS_TODO",
}

export interface AddTodoAction {
  type: Types.ADD_TODO;
  payload: Todo;
}

export interface DeleteTodoAction {
  type: Types.DELETE_TODO;
  payload: Id;
}

export interface EditTodoAction {
  type: Types.EDIT_TODO;
  payload: {
    text: string;
    id: Id;
  };
}

export interface SetStatusTodoAction {
  type: Types.SET_STATUS_TODO;
  payload: Id;
}

export type Actions =
  | AddTodoAction
  | DeleteTodoAction
  | EditTodoAction
  | SetStatusTodoAction;
 */
