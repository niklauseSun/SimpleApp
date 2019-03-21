import axios from 'axios'
import { E } from '../config'

axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const commonHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

function filterJSON(res) {
  return res.data;
}

function filterStatus(res) {
  if (res.status >= 200 && res.status < 300) {
    return res;
  }
  else {
    throw { status: res.status, detail: res.data };
  }
}

function rp(path, params, method = 'POST', header = null) {
  let headers = {}
  console.log('path', path, global.SessionID)
  if (global.SessionID != null) {
    console.log('is Used?')
    headers = {
      'SessionID': global.SessionID
    }
  }
  if (params == null) {
    console.log('paramsnull', path)
    return axios({
      url: E.SERVER_HOME + path,
      method: 'get',
      headers:headers,
    }).then(filterStatus).then(filterJSON).then((response) => {
      const { State } = response
      console.log('resposnse', response)
      if (State == 2) {
        return { error : '需要重新登陆'}
      }
      return response
    }).catch((error) => {
      console.log('error', error)
      return { error: error };
    })
  }

  let rPath = null
  if (path == 'API/App/UserLogin' || 'API/App/WeixinLogin') {
    rPath = E.SERVER_HOME + path
  } else {
    rPath = global.globalServer + path
  }

  console.log('globalSrver', global.globalServer, global.SessionID, rPath)

  let options = {
    headers: {
      ...headers,
    },
    method
  }
  console.log('options', options)
  options.data = JSON.stringify(params)
  console.log('req',path, options)
  return axios(rPath, options).then(filterStatus).then(filterJSON).then((response) => {
    console.log('resposnse' , response)
    return response
  }).catch((error) => {
    console.log('error', error)
    return {error: error};
  })
}


class AxiosUtil {
  /**
   *
   * @param relativePath 相对的路径
   * @param params 参数, 仅仅是参数, 不要带相对路径
   * @param onSuccess 请求成功的回调
   * @param onError 请求错误的回调
   * @param needLoader 是否需要loader, 默认不需要
   * @param loaderText loader加载时的文字
   */

  static post(path, params, header = null) {
    return rp(path, params, 'POST', header = null)
  }

  static get(path) {
    return axios.get(path).then((response) => {
      console.log('get response', response)
      return response
    }).catch((error) => {
      console.log('error', error)
      return error
    })
  }
}

export default AxiosUtil