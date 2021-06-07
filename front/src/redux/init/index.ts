export type Category = string;

export type Id = string;

export interface Work {
  _id: string;
  title: string;
  description: string;
  category: {
    name: string;
  };
  price: number;
  image: string;
  user: {
    _id: string;
    role: string;
    username: string;
    email: string;
    password: string;
  };
}
export interface Artist {
  _id: string;
  username: string;
  email: string;
  password: string;
  favourites?: [];
  role?: string;
}

export interface User {
  id: string;
  email: string;
  username: string;
  role: string;
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
  favourites: Work[];
}
export interface WorksState {
  works: Work[];
}
export interface MyWorksState {
  myWorks: Work[];
}

// тип для workReducer
export interface OneWorkState {
  work: Work;
}
export interface ArtistsState {
  artists: Artist[];
}

// тип для просмотра полей стора в useSelector()
// export interface rootState {
//   works: Work[];
//   userState: UserState;
// }
export interface rootState {
  works: WorksState;
  userState: UserState;
  work: OneWorkState;
  myWorks: MyWorksState;
  artists: ArtistsState;
}

export const initialUserState = {
  user: {
    id: "",
    email: "",
    username: "",
    role: "",
  },
  isAuth: false,
  favourites: [],
  // categories: [],
  // orders: [],
  // works: [],
  // loader: true,
};

export const initialStateCategories = {
  works: [],
};
export const initialStateArtists = {
  artists: [],
};
export const initialStateMyWorks = {
  myWorks: [],
};

export const initialStateWork = {
  work: {
    _id: "",
    title: "",
    description: "",
    category: {
      name: "",
    },
    price: 0,
    image: "",
    user: {
      _id: "",
      role: "",
      username: "",
      email: "",
      password: "",
    },
  },
};
