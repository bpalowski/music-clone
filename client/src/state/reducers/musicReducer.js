import { UPDATE_SONG_STRING, UPDATE_TRACK_LIST, UPDATE_SONG_PLAY } from "../exports/index";

const INITIAL_STATE = {
  songString: '',
  trackList: [],
  play: ''
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case UPDATE_SONG_STRING:
      return {
        ...state,
        songString: action.payload
      }
    case UPDATE_TRACK_LIST:
      return {
        ...state,
        trackList: action.payload
      }
    case UPDATE_SONG_PLAY:
      return {
        ...state,
        play: action.payload
      }
    default: return state;
  }
}


export default reducer