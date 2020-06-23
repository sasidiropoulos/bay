import {
  GET_POSTS,
  TEST_TYPE,
  SET_SUBREDDIT,
  GET_DEFAULT_SUBREDDITS,
  SET_LOADING,
  CHANGE_SORT_BY,
  SET_AFTER,
  GET_POST_DETAIL,
  CLEAR_POST_DETAIL
} from '../types'
import { State, AllActions, PostData } from './redditTypes'

export default (state: State, action: AllActions): State => {
  switch (action.type) {
    case TEST_TYPE: {
      return {
        ...state
        // posts: action.payload
      }
    }
    case GET_POSTS: {
      return {
        ...state,
        posts: [...state.posts!, action.payload],
        loading: false
      }
    }
    case GET_POST_DETAIL: {
      return {
        ...state,
        post: {
          info: state.posts!.map(postArr =>
            postArr.filter(
              (post: PostData) => post.data.name === action.payload.name
            )
          )[0][0],
          comments: action.payload.comments
        }
      }
    }
    case CLEAR_POST_DETAIL: {
      return {
        ...state,
        post: null
      }
    }
    case SET_SUBREDDIT: {
      return {
        ...state,
        subreddit: action.payload,
        after: null,
        posts: []
      }
    }
    case GET_DEFAULT_SUBREDDITS: {
      return {
        ...state,
        defaultSubreddits: action.payload
      }
    }
    case CHANGE_SORT_BY: {
      return {
        ...state,
        sortBy: action.payload,
        after: null,
        posts: []
      }
    }
    case SET_AFTER: {
      return {
        ...state,
        after: action.payload
      }
    }
    case SET_LOADING: {
      return {
        ...state,
        loading: true
      }
    }
    default:
      return state
  }
}
