import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import Home from '../Screens/Home'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  Home: { screen: Home }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'Home'
})

export default createAppContainer(PrimaryNav)
