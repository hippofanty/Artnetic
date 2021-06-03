export type Category = string;

export interface Work {
  title: string;
  description: string;
  category: {
    name: string;
  };
  price: number;
  image: string;
  user: {
    role: string;
    username: string;
    email: string;
    password: string;
  };
}
export interface User {
  id: string,
  email: string,
  username: string,
  role: string,
  // token: string,
}
// export interface State {
//   works: Work[];
//   user: User;
//   isAuth: boolean;
// }

// тип для userReducer
export interface UserState {
  user: User;
  isAuth: boolean;
}
export interface WorksState {
  works: Work[];
}

// тип для просмотра полей стора в useSelector()
// export interface rootState {
//   works: Work[];
//   userState: UserState;
// }
export interface rootState {
  works: WorksState;
  userState: UserState;
}

export const initialUserState = {
  user: {
    id: '',
    email: '',
    username: '',
    role: '',
  },
  isAuth: false,
  // categories: [],
  // orders: [],
  // works: [],
  // loader: true,
}

export const initialStateCategories = {
  works: [],
};

