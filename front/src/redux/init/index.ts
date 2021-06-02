// export const initialStore = {
//   user: {
//     id: '',
//     isAuth: true
//   },
//   categories: [],
//   orders: [],
//   works: [],
//   loader: true,
// }
export type Category = string;

export interface Work {
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
  user: string;
}
export interface User {
  id: string,
  email: string,
  username: string,
  // role: string,
  token: string,
}
export interface State {
  works: Work[];
  user: User;
  isAuth: boolean;
}

// export interface State {
//   user: User;
//   isAuth: boolean,
// }

export const initialState: State = {
  user: {
    id: '',
    email: '',
    username: '',
    // role: '',
    token: '',
  },
  isAuth: false,
  // TS просил добавить строку
  works: [],
  //

  // categories: [],
  // orders: [],
  // works: [],
  // loader: true,
}

export const initialStateCategories: State = {
  // TS просил добавить след-щие строки
  user: {
    id: '',
    email: '',
    username: '',
    // role: '',
    token: '',
  },
  isAuth: false,
  // 
  works: [],
};

