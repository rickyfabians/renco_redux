
import * as React from 'react'
import Home from '../Screens/Home'
import NavigationService from '../Services/NavigationService'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()
function App () {
  return (
    <NavigationContainer ref={(navigatorRef) => {NavigationService.setTopLevelNavigator(navigatorRef)}}>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={Home}  />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
