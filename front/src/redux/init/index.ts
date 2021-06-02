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

export interface State {
  works: Work[];
}

export const initialStateCategories: State = {
  works: [],
};

