export type Category = string;

export type Id = string;
// export type Subscriptions = ['newspaper',
// 'products',
// 'research',
// 'reminder']
export interface Work {
  _id: string;
  title: string;
  description: string;
  category: {
    name: string;
  };
  price: number;
  image: string;
  width?: string;
  height?: string;
  user: {
    _id: string;
    role: string;
    username: string;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
  };
}
export interface OneOrder {
  _id: string;
  vendorCode: string;
  date: string;
  user: {
    _id: string;
    role: string;
    username: string;
    email: string;
  };
  work: Work;
  status: string;
}

export interface ApprovedOrder {
  _id: string;
  vendorCode: string;
  date: string;
  // date: string[];
  user: {
    _id: string;
    role: string;
    username: string;
    email: string;
  };
  work: Work;
  status: string;
}

export interface Artist {
  _id: string;
  username: string;
  email: string;
  password: string;
  favourites?: [];
  role?: string;
  works?: [{
    _id: string;
    category: string;
    description: string;
    image: string;
    price: number;
    title: string;
    user: string;
  }]
}

export interface User {
  subscriptions?: string[]
  lastname?: string;
  firstname?: string;
  phone?: string;
  company?: string;
  about?: string;
  avatar?: string;
  id: string;
  email: string;
  username: string;
  role: string;
}
// тип для userReducer
export interface UserState {
  user: User;
  isAuth: boolean;
  favourites: Work[];
  approvedOrders: ApprovedOrder[];
  
}
export interface WorksState {
  works: Work[];
}
export interface MyWorksState {
  myWorks: Work[];
}
export interface OneArtistWorksState {
  oneArtistWorks: Work[];
}

// тип для workReducer
export interface OneWorkState {
  work: Work;
}
export interface ArtistsState {
  artists: Artist[];
}

export interface OrdersState {
  allApprovedOrders: ApprovedOrder[];
  allOrders: OneOrder[];
}

// тип для просмотра полей стора в useSelector()

export interface rootState {
  works: WorksState;
  userState: UserState;
  work: OneWorkState;
  myWorks: MyWorksState;
  artists: ArtistsState;
  ordersState: OrdersState;
  oneArtistWorks: OneArtistWorksState;
}

export const initialUserState = {
  user: {
    id: "",
    email: "",
    username: "",
    role: "",
    avatar: '',
    phone: '',
    firstname: '',
    lastname: '',
    company: '',
    about: '',
    subscriptions: [],
  },
  isAuth: false,
  favourites: [],
  approvedOrders: [],
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
export const initialStateOneArtistWorks = {
  oneArtistWorks: [],
};

export const intitialStateOrders = {
  allApprovedOrders: [],
  allOrders: [],
}

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
    width: "",
    height: "",
    user: {
      _id: "",
      role: "",
      username: "",
      email: "",
      password: "",
      firstname: "",
      lastname: "",
    },
  },
};
