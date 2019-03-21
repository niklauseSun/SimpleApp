import { AxiosUtil } from '../utils'
import { ActionTypes } from '../constants';
import { E } from '../config'
import base from './base'

const loginUrl = 'API/App/UserLogin'
const wxLoginUrl = 'API/App/WeixinLogin'
const beginCalculste = 'API/WxApp/InitCalc'
const selectSolution = 'API/WxApp/SelectSolution'
const querySolutions = 'API/WxApp/QuerySolutions'
const getUserinfo = 'API/WxApp/UserInfo'
const updateUserName = 'API/WxApp/UpdateUserName'
const updateWXAccount = 'API/WxApp/UpdateWeixinAccount'
const updateHospitalName = 'API/WxApp/UpdateHospital'
const updateDepartmentName = 'API/WxApp/UpdateDepartment'
const updatePWD = 'API/WxApp/UpdatePwd'

const getAdminInfo = 'API/WxApp/AdminInfo'
const logoutUrl = 'API/WxApp/Logout'
const getServerVersion = 'API/App/VerManage'

export default {
  login: function* (payload) {
    const { data, callBack } = payload
    let { Data, error, ErrorMessage } = yield AxiosUtil.post(loginUrl, data)
    if (ErrorMessage) {
      callBack && callBack(Data, {ErrorMessage})
    } else {
      yield base.after(Data, error, ActionTypes.LOGIN_SUCCESS)
      callBack && callBack(Data, error)
    }
  },
  // beginCalculateMedicine: function *(payload) {
  //   const { data, callBack } = payload
  //   const { Data, error } = yield AxiosUtil.post(beginCalculste, data)
  //   yield base.after(Data, error, ActionTypes.BEGIN_CALCULATE_MEDICINE_SUCCESS)
  //   callBack && callBack(Data, error)
  // },
  // selectSolutionFunc: function * (payload) {
  //   const { data, callBack } = payload
  //   const solutionId = data.solutionId
  //   let path = selectSolution + '/' + solutionId
  //   const {Data, error} = yield AxiosUtil.post(path, null)
  //   yield base.after(Data, error, ActionTypes.SAVE_SOLUTION_ID_SUCCESS)
  //   callBack && callBack(Data, error)
  // },
  // querySolutionsFunc: function * (payload) {
  //   const { data, callBack, loadType } = payload
  //   const { Data, Page, error } = yield AxiosUtil.post(querySolutions, data)
  //   yield base.after(Data, error, ActionTypes.QUERY_SOLUTIONS_SUCCESS)
  //   callBack && callBack(loadType, {Page, Data}, error)
  // },
  getUserInfoFunc: function * (payload) {
    const { data, callBack } = payload
    const { Data, error } = yield AxiosUtil.post(getUserinfo, data)
    yield base.after(Data, error, ActionTypes.GET_UERINFO_SUCCESS)
    callBack && callBack(Data, error)
  },
  updateUserNameFunc: function * (payload) {
    const { data, callBack } = payload
    const { Data, error } = yield AxiosUtil.post(updateUserName, data)
    yield base.after(Data, error, ActionTypes.UPDATE_USERNAME_SUCCESS)
    callBack && callBack(Data, error)
  },
  updateWXAccountFunc: function * (payload) {
    const { data, callBack } = payload
    const { Data, error } = yield AxiosUtil.post(updateWXAccount, data)
    yield base.after(Data, error, ActionTypes.UPDATE_WX_ACCOUNT_SUCCESS)
    callBack && callBack(Data, error)
  },
  updateHospitalNameFunc: function * (payload) {
    const { data, callBack } = payload
    const { Data, error } = yield AxiosUtil.post(updateHospitalName, data)
    yield base.after(Data, error, ActionTypes.UPDATE_HOSPITAL_SUCCESS)
    callBack && callBack(Data, error)
  },
  updateDepartmentNameFunc: function * (payload) {
    const { data, callBack } = payload
    const { Data, error } = yield AxiosUtil.post(updateDepartmentName, data)
    yield base.after(Data, error, ActionTypes.UPDATE_DEPARTMENT_SUCCESS)
    callBack && callBack(Data, error)
  },
  updatePWDFunc: function * (payload) {
    const { data, callBack } = payload
    const { Data, error, ErrorMessage } = yield AxiosUtil.post(updatePWD, data)
    // const {  } = Data
    if (ErrorMessage == null) {
      callBack && callBack(true, ErrorMessage)
    } else {
      callBack && callBack(false, ErrorMessage)
    }
    // // yield base.after(Data, error, ActionTypes.UPDATE_PASSWORD_SUCCESS)
    // callBack && callBack(Data, error)
  },
  // adjustCalculateFunc: function * (payload) {
  //   const { data, callBack } = payload
  //   const { Data, error } = yield AxiosUtil.post(adjustCalculate, data)
  //   yield base.after(Data, error, ActionTypes.ADJUST_CALCULATE_SUCCESS)
  //   callBack && callBack(Data, error)
  // },
  // queryAdjustSolutionFunc: function * (payload) {
  //   const { data, callBack, loadType = 0 } = payload
  //   const { Data, error, Page } = yield AxiosUtil.post(queryAdjustSolution, data)
  //   yield base.after(Data, error, ActionTypes.QUERY_ADJUST_SOLUTIONS_SUCCESS)
  //   callBack && callBack(loadType, {Data, Page }, error)
  // },
  getAdminInfoFunc: function * (payload) {
    const { data, callBack } = payload
    const { Data, error } = yield AxiosUtil.post(getAdminInfo, data)
    yield base.after(Data, error, ActionTypes.GET_ADMIN_INFO_SUCCESS)
    callBack && callBack(Data, error)
  },

  getAccessToken: function * (payload) {
    const { code, callBack } = payload
    const path = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${E.WECHAT_APP_ID}&secret=${E.WECHAT_APP_SECRET}&code=${code}&grant_type=authorization_code`
    const res = yield AxiosUtil.get(path)
    callBack && callBack(res)
  },

  getWxUserInfo: function * (payload) {
    const { path, callBack } = payload
    const res = yield AxiosUtil.get(path)

    callBack && callBack(res)
  },

  wxLoginAction: function * (payload) {
    const { data, callBack } = payload
    const { Data, error, State } = yield AxiosUtil.post(wxLoginUrl, data)
    if (State == 1) {
      callBack && callBack({ State, Data }, error)
      yield base.after(Data, error, ActionTypes.WX_LOGIN_SUCCESS)
    } else {
      callBack && callBack({ State, Data }, error)
    }
  },

  loginOutAction: function * (payload) {
    const { data = {} } = payload
    const { Data, error, State } = yield AxiosUtil.post(logoutUrl, data)
    // console.log('logoutaction', Data, State)
  },
  getServerVersion: function * (payload) {
    const { data = {}, callBack } = payload;
    const { Data, error, State } = yield AxiosUtil.post(getServerVersion, data)
    callBack && callBack(Data, error)
  }
}