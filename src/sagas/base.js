import { put } from 'redux-saga/effects'

export default {
  after: function* (response, error, actionType) {
    if (error) {

      // 错误处理
      console.warn(error)
    } else {
      yield put({ type: actionType, payload: response });
    }
  }
}