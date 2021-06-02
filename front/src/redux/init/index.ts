export interface User {
  id: string,
  email: string,
  username: string,
  // role: string,
  token: string,
}

export interface State {
  user: User;
  isAuth: boolean,
}

export const initialState: State = {
  user: {
    id: '',
    email: '',
    username: '',
    // role: '',
    token: '',
  },
  isAuth: false,
  // categories: [],
  // orders: [],
  // works: [],
  // loader: true,
}
