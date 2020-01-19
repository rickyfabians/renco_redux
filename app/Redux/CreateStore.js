import { createStore, applyMiddleware, compose } from 'redux'
import Config from '../Config/DebugConfig'
import createSagaMiddleware from 'redux-saga'
import ScreenTracking from './ScreenTrackingMiddleware'
// import logger from 'redux-logger'
import { appNavigatorMiddleware } from '../Navigation/ReduxNavigation'

// creates the store
export default (rootReducer, rootSaga) => {
  /* ------------- Redux Configuration ------------- */

  const middleware = []
  const enhancers = []

  /* ------------- Navigation Middleware ------------ */
  middleware.push(appNavigatorMiddleware)

  /* ------------- Analytics Middleware ------------- */
  middleware.push(ScreenTracking)

  /* ------------- Saga Middleware ------------- */

  const sagaMonitor = Config.pdebug
    ? null : null
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor })
  middleware.push(sagaMiddleware)

  /* ------------- Logger Middleware ------------- */
  // if (mainConfig.DEBUG && __DEV__) {
  // middleware.push(logger)
  // }

  /* ------------- Assemble Middleware ------------- */

  enhancers.push(applyMiddleware(...middleware))

  // if Reactotron is enabled (default for __DEV__), we'll create the store through Reactotron
  const createAppropriateStore = Config.useReactotron ? createStore : createStore
  const store = createAppropriateStore(rootReducer, compose(...enhancers))

  // kick off root saga
  let sagasManager = sagaMiddleware.run(rootSaga)

  return {
    store,
    sagasManager,
    sagaMiddleware
  }
}
