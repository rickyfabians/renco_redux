import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
// import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { NewsTypes } from '../Redux/NewsRedux'

/* ------------- Sagas ------------- */

import { getNews } from './NewsSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(NewsTypes.NEWS_REQUEST, getNews, api)
  ])
}
