import { GET_USER, AUTHENTICATED_LOGIN_ACCESS, AUTHENTICATED_LOGOUT_ACCESS, UPDATE_USER } from "../exports/index";

const INITIAL_STATE = {
  authenticated: false,
  userData: [],
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    // Get User Data
    case GET_USER:
      return {
        ...state
      }

    // Upate User
    case UPDATE_USER:
      return {
        ...state,
        userData: action.payload
      }

    //Login
    case AUTHENTICATED_LOGIN_ACCESS:
      return {
        ...state,
        authenticated: state.authenticated = true
      }

    // logout
    case AUTHENTICATED_LOGOUT_ACCESS:
      return {
        ...state,
        authenticated: state.authenticated = false
      }

    default: return state;
  }

}


export default reducer