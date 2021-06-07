import { Actions, Types } from "../types/index";
import { initialStateArtists, ArtistsState } from "../init/index";

export const artistsReducer = ( state: ArtistsState = initialStateArtists, action: Actions): ArtistsState => {
  switch (action.type) {
    case Types.GET_ARTISTS:
      return {
        ...state,
        artists: action.payload
      };

    default:
      return state;
  }
};
