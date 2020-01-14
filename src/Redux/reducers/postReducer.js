import axios from "axios";

const initialState = {
  post: []
};

const CREATE_POST = "CREATE_POST";
const GETALL_POSTS = "GETALL_POSTS";

export function createPost(newPost) {
  return {
    type: CREATE_POST,
    payload: axios.post("/api/post/", newPost)
  };
}
export function getAllPost() {
  return {
    type: GETALL_POSTS,
    payload: axios.get(`/api/allPosts`)
  };
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  console.log(payload);

  switch (type) {
    case `${CREATE_POST}_FULFILLED`:
      return {
        ...state,
        post: payload.data
      };
    case `${GETALL_POSTS}_FULFILLED`:
      return {
        ...state,
        post: payload.data
      };
    default:
      return state;
  }
}
