import { GET_USER, AUTHENTICATED_LOGIN_ACCESS, AUTHENTICATED_LOGOUT_ACCESS, UPDATE_USER, UPDATE_SONG_STRING, UPDATE_TRACK_LIST, UPDATE_SONG_PLAY } from "../exports/index";

//User
export const getUserInfo = () => {
  return {
    type: GET_USER
  };
};

export const updateUser = (data) => dispatch => {
  dispatch({
    type: UPDATE_USER,
    payload: data
  });
};

export const setLogin = () => {
  return {
    type: AUTHENTICATED_LOGIN_ACCESS,
  }
};

export const setLogut = () => {
  return {
    type: AUTHENTICATED_LOGOUT_ACCESS
  };
};

//Tracs
export const setTracksList = (data) => dispatch => {

  dispatch({
    type: UPDATE_TRACK_LIST,
    payload: data
  });
};
export const stringTrac = (data) => dispatch => {
  dispatch({
    type: UPDATE_SONG_STRING,
    payload: data
  });
};
export const playpause = (data) => dispatch => {
  dispatch({
    type: UPDATE_SONG_PLAY,
    payload: data
  });
};