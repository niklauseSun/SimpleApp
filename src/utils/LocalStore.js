import { AsyncStorage } from 'react-native'

export default class LocalStore {
  static _storeData = async(key, value) => {
    // console.log('_storeData', key, value)
    try {
      await AsyncStorage.setItem(key, value)
      // console.log('saved')
    } catch (error) {
      // console.log('error', error)
    }
  }

  static _getData = async(key) => {
    try {
      const value =  await AsyncStorage.getItem(key)
      // console.log('received', value)
      return value
    } catch (error) {
      return null
    }
  }

  static _removeData = async(key) => {
    try {
      AsyncStorage.removeItem(key, (err) => {
        // console.log('err', err)
      })
    } catch (error) {
      return null
    }
  }
}