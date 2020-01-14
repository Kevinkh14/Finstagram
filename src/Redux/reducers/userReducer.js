import axios from 'axios'

const initialState = {
    user_id: null,
    username : "",
    name : "",
    email: "",
    profile_pic:"",
    following:"",
    followers:""
}

const GET_SESSION = "GET_SESSION";
const REGISTER_USER = "REGISTER_USER";
const LOGIN_USER = "LOGIN_USER";
const LOGOUT_USER = "LOGOUT_USER";


export function getSession() {
    return {
      type: GET_SESSION,
      payload: axios.get(`/auth/user`)
    };
  }
export function registerUser(newUser) {
  return {
    type: REGISTER_USER,
    payload: axios.post("/auth/register", newUser)
  };
}
export function loginUser(user) {
    return {
      type: LOGIN_USER,
      payload: axios.post("/auth/login", user)
    };
  }
export function logoutUser() {
  axios.post("/auth/logout");
  return {
    type: LOGOUT_USER
  };
}
export default function reducer(state = initialState, action) {
    const { type, payload } = action;
  
  
  
    switch (type) {
      case `${GET_SESSION}_FULFILLED`:
        return {
          ...state,
          user_id: payload.data.user_id,
          name: payload.data.name,
          username: payload.data.username,
          email: payload.data.email,
          profile_pic: payload.data.profile_pic,
          following:payload.data.following,
          followers:payload.data.followers
        };
      case `${REGISTER_USER}_FULFILLED`:
        return {
            ...state,
            user_id: payload.data.user_id,
            name: payload.data.name,
            username: payload.data.username,
            email: payload.data.email,
            profile_pic: payload.data.profile_pic,
            following:payload.data.following,
            followers:payload.data.followers
          };
      case `${LOGIN_USER}_FULFILLED`:
        return {
            ...state,
            user_id: payload.data.user_id,
            name: payload.data.name,
            username: payload.data.username,
            email: payload.data.email,
            profile_pic: payload.data.profile_pic,
            following:payload.data.following,
            followers:payload.data.followers
          };
      case LOGOUT_USER:
        return {
          user_id: null,
          name: "",
          username: "",
          email: "",
          profile_pic: "",
          following:"",
          followers:""
        }
        default:
            return state;

    }

}