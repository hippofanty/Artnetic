import { Actions, Types } from "../types/index";
import { initialStateOneArtistWorks, OneArtistWorksState } from "../init/index";

export const oneArtistWorksReducer = ( state: OneArtistWorksState = initialStateOneArtistWorks, action: Actions): OneArtistWorksState => {
  switch (action.type) {
    case Types.GET_ONE_ARTIST_WORKS:
      return {
        ...state,
        oneArtistWorks: action.payload
      };

    default:
      return state;
  }
};
