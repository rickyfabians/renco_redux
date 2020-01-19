import { StyleSheet, Dimensions } from 'react-native'

const { height, width } = Dimensions.get('screen')
const styles = StyleSheet.create({
  boxShadow: {
    borderWidth: 1,
    borderRadius: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  fontSizeMedium: {
    fontSize: 16
  },
  loadingAnimation: {
    width,
    height: height * 0.5
  },
  notFoundAnimation: {
    width: width * 0.5,
    height: width * 0.5
  }
})

export default styles
