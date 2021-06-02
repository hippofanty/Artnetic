export enum Types {
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
// для редусера
export type Actions = SetUserAction;
