import { call, put } from 'redux-saga/effects'
import NewsActions from '../Redux/NewsRedux'

export function * getNews (api, action) {
  const { search } = action
  // make the call to the api
  const response = yield call(api.getNews, search)
  if (response.ok) {
    // do data conversion here if needed
    if (search) yield put(NewsActions.newsSearchResultSuccess(response.data))
    else yield put(NewsActions.newsSuccess(response.data))
  } else {
    yield put(NewsActions.newsFailure('Terjadi kesalahan koneksi'))
  }
}
