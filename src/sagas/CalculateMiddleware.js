import { AxiosUtil } from '../utils'
import { ActionTypes } from '../constants';
import { E } from '../config'
import base from './base'

const beginCalculste = 'API/WxApp/InitCalc'
const selectSolution = 'API/WxApp/SelectSolution'
const querySolutions = 'API/WxApp/QuerySolutions'
const adjustCalculate = 'API/WxApp/AdjustCalc'
const queryAdjustSolution = 'API/WxApp/AdjustSolutions'

const predictConcentrationCalc = 'API/WxApp/ConcentrationCalc'
const initConcentrationCalc = 'API/WxApp/InitConcentrationCalc'

const medicines = 'API/WxApp/Medicines'

export default {
  beginCalculateMedicine: function* (payload) {
    const { data, callBack } = payload
    const { Data, error } = yield AxiosUtil.post(beginCalculste, data)
    yield base.after(Data, error, ActionTypes.BEGIN_CALCULATE_MEDICINE_SUCCESS)
    callBack && callBack(Data, error)
  },
  querySolutionsFunc: function* (payload) {
    const { data, callBack, loadType } = payload
    const { Data, Page, error } = yield AxiosUtil.post(querySolutions, data)
    yield base.after(Data, error, ActionTypes.QUERY_SOLUTIONS_SUCCESS)
    callBack && callBack(loadType, { Page, Data }, error)
  },
  selectSolutionFunc: function* (payload) {
    const { data, callBack } = payload
    const solutionId = data.solutionId
    let path = selectSolution + '/' + solutionId
    const { Data, error } = yield AxiosUtil.post(path, null)
    yield base.after(Data, error, ActionTypes.SAVE_SOLUTION_ID_SUCCESS)
    callBack && callBack(Data, error)
  },
  adjustCalculateFunc: function* (payload) {
    const { data, callBack } = payload
    const { Data, error } = yield AxiosUtil.post(adjustCalculate, data)
    yield base.after(Data, error, ActionTypes.ADJUST_CALCULATE_SUCCESS)
    callBack && callBack(Data, error)
  },
  queryAdjustSolutionFunc: function* (payload) {
    const { data, callBack, loadType = 0 } = payload
    const { Data, error, Page } = yield AxiosUtil.post(queryAdjustSolution, data)
    yield base.after(Data, error, ActionTypes.QUERY_ADJUST_SOLUTIONS_SUCCESS)
    callBack && callBack(loadType, { Data, Page }, error)
  },

  predictConcentrationCalc: function * (payload) {
    const { data, callBack } = payload
    const { Data, error } = yield AxiosUtil.post(predictConcentrationCalc, data)
    // yield base.after(Data, error. ActionTypes.)
    callBack && callBack(Data, error)
  },

  initConcentrationCalc: function * (payload) {
    const { data, callBack } = payload
    const { Data, error } = yield AxiosUtil.post(initConcentrationCalc, data)
    console.log('initConcentrationCalc', Data, callBack)
    callBack && callBack(Data, error)
  },

  getMedicines: function * (payload) {
    const { data, callBack } = payload
    const { Data, error } = yield AxiosUtil.post(medicines, data)
    callBack && callBack(Data, error)
  }
}