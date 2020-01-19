import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  newsRequest: ['search'],
  newsSuccess: ['data'],
  newsSearchResultSuccess: ['data'],
  newsFailure: null
})

export const NewsTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  searchResult: null,
  fetching: null,
  error: null
})

/* ------------- Reducers ------------- */

// request the avatar for a news
export const request = (state, { newsname }) =>
  state.merge({ fetching: true })

// successful avatar lookup
export const success = (state, { data }) => {
  return state.merge({ fetching: false, error: null, data })
}

export const searchResultSuccess = (state, { data }) => {
  return state.merge({ fetching: false, error: null, searchResult: data })
}

// failed to get the avatar
export const failure = (state, { error }) =>
  state.merge({ fetching: false, error })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.NEWS_REQUEST]: request,
  [Types.NEWS_SEARCH_RESULT_SUCCESS]: searchResultSuccess,
  [Types.NEWS_SUCCESS]: success,
  [Types.NEWS_FAILURE]: failure
})
