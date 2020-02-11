import { createStore, applyMiddleware, compose } from 'redux'
import Config from '../Config/DebugConfig'
import createSagaMiddleware from 'redux-saga'
import Rehydration from '../Services/Rehydration'
import ReduxPersist from '../Config/ReduxPersist'
// import ScreenTracking from './ScreenTrackingMiddleware'
// import logger from 'redux-logger'
// import { appNavigatorMiddleware } from '../Navigation/ReduxNavigation'
import { composeWithDevTools } from 'redux-devtools-extension'

// creates the store
export default (rootReducer, rootSaga) => {
  /* ------------- Redux Configuration ------------- */

  const middleware = []
  const enhancers = []

  /* ------------- Navigation Middleware ------------ */
  // middleware.push(appNavigatorMiddleware)

  /* ------------- Analytics Middleware ------------- */
  // middleware.push(ScreenTracking)

  /* ------------- Saga Middleware ------------- */

  const sagaMonitor = null
  const sagaMiddleware = createSagaMiddleware({ sagaMonitor })
  middleware.push(sagaMiddleware)

  /* ------------- Logger Middleware ------------- */
  // if (mainConfig.DEBUG && __DEV__) {
  // middleware.push(logger)
  // }

  /* ------------- Assemble Middleware ------------- */

  if(__DEV__) enhancers.push(composeWithDevTools(applyMiddleware(...middleware)))
  else enhancers.push(applyMiddleware(...middleware))

  // if Reactotron is enabled (default for __DEV__), we'll create the store through Reactotron
  const store = createStore(rootReducer, compose(...enhancers))

  if (ReduxPersist.active) {
    Rehydration.updateReducers(store)
  }

  // kick off root saga
  let sagasManager = sagaMiddleware.run(rootSaga)

  return {
    store,
    sagasManager,
    sagaMiddleware
  }
}
