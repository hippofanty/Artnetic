import { Types } from "../types/index";
import {Work } from "../init";


export const addMyWorkAC = (work: Work) => ({
  type: Types.ADD_MY_WORK,
  payload: work,
});
