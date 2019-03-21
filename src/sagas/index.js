import { takeEvery } from 'redux-saga'
import { put } from "redux-saga/effects";
import ActionTypes from '../constants/ActionTypes';
import LoginMiddleware from './LoginMiddleware';
import CalculateMiddleware from './CalculateMiddleware';

const apiMap = {
  // [ActionTypes.API_GET_DOCTOR_PROFILE]: DoctorPortMiddleware.getDoctorProfile
  [ActionTypes.LOGIN_ACTION]: LoginMiddleware.login,
  [ActionTypes.GET_USERINFO]: LoginMiddleware.getUserInfoFunc,
  [ActionTypes.UPDATE_USERNAME]: LoginMiddleware.updateUserNameFunc,
  [ActionTypes.UPDATE_WX_ACCOUNT]: LoginMiddleware.updateWXAccountFunc,
  [ActionTypes.UPDATE_HOSPITAL]: LoginMiddleware.updateHospitalNameFunc,
  [ActionTypes.UPDATE_DEPARTMENT]: LoginMiddleware.updateDepartmentNameFunc,
  
  [ActionTypes.GET_ADMIN_INFO]: LoginMiddleware.getAdminInfoFunc,
  [ActionTypes.GET_ACCESSTOKEN]: LoginMiddleware.getAccessToken,
  [ActionTypes.GET_WX_USERINFO]: LoginMiddleware.getWxUserInfo,
  [ActionTypes.WX_LOGIN]: LoginMiddleware.wxLoginAction,
  [ActionTypes.LOGOUT_ACTION]: LoginMiddleware.loginOutAction,
  [ActionTypes.GET_SERVER_VERSION]: LoginMiddleware.getServerVersion,

  [ActionTypes.BEGIN_CALCULATE_MEDICINE]: CalculateMiddleware.beginCalculateMedicine,
  [ActionTypes.SAVE_SOLUTION_ID]: CalculateMiddleware.selectSolutionFunc,
  [ActionTypes.QUERY_SOLUTIONS]: CalculateMiddleware.querySolutionsFunc,
  [ActionTypes.UPDATE_PASSWORD]: CalculateMiddleware.updatePWDFunc,
  [ActionTypes.ADJUST_CALCULATE]: CalculateMiddleware.adjustCalculateFunc,
  [ActionTypes.QUERY_ADJUST_SOLUTIONS]: CalculateMiddleware.queryAdjustSolutionFunc,
  [ActionTypes.PREDICT_CONCENTRATION_CALC]: CalculateMiddleware.predictConcentrationCalc,
  [ActionTypes.INIT_CONCENTRATION_CALC]: CalculateMiddleware.initConcentrationCalc,

  [ActionTypes.GET_MEDICINES]: CalculateMiddleware.getMedicines
};

const apiService = function*(action) {
  const { type, payload } = action;
  switch(type) {
    // case ActionTypes.API_GET_MEDICINE_LIST:
    //   yield MedicineMiddleware.getMedicineList(payload)
    //   break
    // case ActionTypes.LOGIN_ACTION:
    //   yield LoginMiddleware.login(payload)
    //   break
  }

  if (apiMap.hasOwnProperty(type)) {
    console.log('api map', type)
    yield apiMap[type](payload)
  }
}

const mySaga = function* mySaga() {
  yield* takeEvery(
    action => {
      return action
    }, apiService
  )
}

export default mySaga