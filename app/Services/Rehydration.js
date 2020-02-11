import ReduxPersist from '../Config/ReduxPersist'
import { AsyncStorage } from 'react-native'
import { persistStore } from 'redux-persist'
// import StartupActions from '../Redux/StartupRedux'
// import DebugConfig from '../Config/DebugConfig'

const updateReducers = (store, isServer) => {
  const reducerVersion = ReduxPersist.reducerVersion
  // const startup = () => store.dispatch(StartupActions.startup())
  // Check to ensure latest reducer version
  AsyncStorage.getItem('reducerVersion').then((localVersion) => {
    if (localVersion !== reducerVersion) {
      // Purge store
      persistStore(store, null).purge()
      AsyncStorage.setItem('reducerVersion', reducerVersion)
    } else {
      persistStore(store, null)
    }
  }).catch(() => {
    persistStore(store, null)
    AsyncStorage.setItem('reducerVersion', reducerVersion)
  })
}

export default { updateReducers }
