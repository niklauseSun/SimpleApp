import { ActionTypes } from '../constants'
'use strict'
const initialState = {
  isLogin: false,
  userName: null,
  sessionId: null,
  willReload: false,
  userInfo: {
    nickName: null,
    sex: null,
    headImage: null,
    hospitalName: null,
    departmentName: null,
    phoneNum: null,
    wxNum: null,
  }
}

export default function login(state = initialState, action = {}) {
  const { type, payload } = action
  switch (type) {
    case ActionTypes.LOGIN_SUCCESS:
      const { UserName, SessionID } = payload
      global.SessionID = SessionID
      global.globalServer = payload['Server']
      return {
        ...state,
        userName: UserName,
        sessionId: SessionID,
        isLogin: true
      }
      break;
      case ActionTypes.GET_UERINFO_SUCCESS:
        return {
          ...state,
          userInfo: {
            ...payload
          }
        }
      break;
      case ActionTypes.LOGOUT:
        return {
          ...state,
          isLogin: false,
          userName: null,
          sessionId: null,
          userInfo: {
            nickName: null,
            sex: null,
            headImage: null,
            hospitalName: null,
            departmentName: null,
            phoneNum: null,
            wxNum: null,
          }
        }
        break;
    case ActionTypes.WX_LOGIN_SUCCESS:
      const { UserName: name, SessionID: sessionId } = payload
      global.SessionID = sessionId
      global.globalServer = payload['Server']
      return {
        ...state,
        userName: name,
        sessionId: sessionId,
        isLogin: true
      }
    case ActionTypes.SET_RELOAD_STATUE:
      return {
        ...state,
        willReload: true
      }
    break;
      return state;
  }
  return state
}