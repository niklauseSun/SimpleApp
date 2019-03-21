import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Keyboard, Platform, DeviceEventEmitter } from 'react-native';
import { SafeAreaView } from 'react-navigation'
import { NavHeader, LineInput, BlueButton, SelectButton, CheckButton, SpinnerLoadView} from '../../components'
import { px, IsPhone, ToastUtil, LocalStore, AesEncrypt } from '../../utils';
import { AssetImages, UrlData } from '../../constants';
import MD5 from 'react-native-md5'
import {ActionTypes} from '../../constants';
import DeviceInfo from 'react-native-device-info';
import { E } from '../../config';
import * as WeChat from 'react-native-wechat'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone:'18550190970',
      password: '1234',
      isChecked: false
    };
    this.access_token = null
    this.openid = null
    this.refresh_token = null
    this.unionid = null
    this.city = null
    this.country = null
    this.headimgurl = null
    this.language = null
    this.nickname = null
    this.privilege = null
    this.province = null
    this.sex = 1
  }

  componentWillMount() {
    LocalStore._getData('passwordSaved').then((res) => {
      if (res == 'saved') {
        this.setState({
          isChecked : true
        })
      }
    })
    LocalStore._getData('phone').then((res) => {
      console.log('ret', res)
      this.setState({
        phone: res
      })
    })
    LocalStore._getData('password').then((res) => {
      this.setState({
        password: res
      })
    })
  }

  render() {
    return <SafeAreaView style={{ flex: 1, backgroundColor: "#123D70" }}>
        <NavHeader title="登录" showBackButton={true} navigation={this.props.navigation} />
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            Keyboard.dismiss()
          }}
          style={{ flex: 1, alignItems: "center" }}>
          <Image style={{ width: px(170), height: px(120), marginTop: px(64), marginBottom: px(64) }} source={AssetImages.ICON_LOGO} />
          <LineInput
            onChangeText={this.changePhoneNum.bind(this)}
            placeholder="登录"
            inputValue={this.state.phone}
            keyboardType="number-pad"
            style={{ width: px(686) }} />
          <LineInput
            placeholder="密码"
            inputValue={this.state.password}
            secureTextEntry={true}
            style={{ width: px(686), marginTop: px(56) }}
            onChangeText={this.changePassword.bind(this)}
            />
        <View style={{ flexDirection: "row", marginTop: px(64), alignItems: 'center', marginLeft: px(32)  }}>
          <CheckButton
            isSelect={this.state.isChecked}
            changeSelectStatus={this.changeSelectStatus.bind(this)}
            style={{ width: px(28), height: px(28), marginRight: px(8) }}/>
            <View style={{ flex: 1, }}>
              <Text style={{
                color: '#FFF',
                fontSize: px(28),
                opacity: 0.8
              }}>自动登录</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                this.props.navigation.navigate('ForgotPassword')
              }}
              style={{ marginRight: px(32) }}>
              <Text style={{
                color: '#FFF',
                fontSize: px(28),
                opacity: 0.8
              }}>忘记密码</Text>
            </TouchableOpacity>
          </View>
          <BlueButton
            title="登录"
            backgroundStyle={{ width: px(686), marginTop: px(48) }}
          onPress={this.loginByPhone.bind(this)}
            />
        {E.WECHAT_INSTALLED ? <TouchableOpacity
          onPress={() => {
            this.wechatGetAccessCode()
          }}
          style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image style={{ width: px(80), height: px(80), marginTop: px(60) }} source={AssetImages.WX_LOGIN} />
          <Text style={{ color: '#fff', marginTop: px(32) }}>微信登陆</Text>
        </TouchableOpacity>: null}
        </TouchableOpacity>
      </SafeAreaView>;
  }
  changePhoneNum(val) {
    console.log('val',val)
    this.setState({
      phone: val
    })
  }

  changePassword(val) {
    console.log('val password',val)
    this.setState({
      password: val
    })
  }

  changeSelectStatus(flag) {
    this.setState({
      isChecked: flag
    })
  }

  login() {
    if (!IsPhone(this.state.phone)) {
      ToastUtil.fail('请输入正确的手机号')
      return;
    }

    if (!this.state.password || this.state.password.trim().length == 0) {
      ToastUtil.fail('请输入密码')
      return;
    }
    const data = {
      "UserCellphone": this.state.phone,
      "UserPwd": MD5.b64_md5(this.state.password) + '==',
      "LoginSvcID": Platform.OS === 'ios' ? 1 : 2,
      "DiskID":'T7G0215520000435faaa01e17d7ef281',
      "ClientVersion": DeviceInfo.getVersion()
    }
    const callBack = this.loginSuccess.bind(this)
    actionUtil(ActionTypes.LOGIN_ACTION, { data, callBack})
    SpinnerLoadView.show()
  }


  loginSuccess(data, error) {
    SpinnerLoadView.hide()
    if (data) {
      // 成功登录
      ToastUtil.message('登录成功')
      this.saveUserPassword()
      this.getUserInfo()
      DeviceEventEmitter.emit('dataAdjust')
      this.props.navigation.goBack()
    } else {
      const { ErrorMessage } = error
      if (ErrorMessage) {
        ToastUtil.fail(ErrorMessage)
        return;
      }
      ToastUtil.fail('登陆失败！')
    }
  }

  saveUserPassword() {
    if (this.state.isChecked) {
      LocalStore._storeData('passwordSaved', 'saved')
      LocalStore._storeData('phone', this.state.phone)
      LocalStore._storeData('password', this.state.password)
    }
  }

  getUserInfo() {
    const data = {}
    console.log('getUserInfo')
    actionUtil(ActionTypes.GET_USERINFO, { data })
  }

  wechatGetAccessCode() {
    WeChat.isWXAppInstalled().then((isInstalled) => {
      console.log('is install', isInstalled)
      if (isInstalled) {
        console.log('access', WeChat)
        WeChat.sendAuthRequest('snsapi_userinfo', 'rongletech').then((response) => {
          actionUtil(ActionTypes.GET_ACCESSTOKEN, { code: response.code, callBack: this.getAccessTokenSuccess.bind(this) })
        }).catch((error) => {
          console.log('error', error)
          ToastUtil.fail('微信登录失败！')
          let errorCode = Number(error.code);
          if (errorCode === -2) {
          } else {
          }
        })
      }
    });
  }

  getAccessTokenSuccess(res) {
    console.log('res getAccessToken', res)
    const { data } = res;
    if (data != null) {
      const { access_token, openid, refresh_token, unionid } = data
      this.access_token = access_token
      this.openid = openid
      this.refresh_token = refresh_token
      this.unionid = unionid
      this.wxLogin(unionid)
    }
  }

  getWXUserInfo(access_token, openid) {
    const path = `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}`
    actionUtil(ActionTypes.GET_WX_USERINFO, { path: path, callBack: this.getWxUserInfoSuccess.bind(this)})
  }

  getWxUserInfoSuccess(res) {
    console.log('getWxUserInfoSuccess', res)
    const { data } = res;
    if (data) {
      // city: "Pudong New District"
      // country: "CN"
      // headimgurl: "http://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epu6sByyPBBEvFa4PzdTDSs2ibzvX0KMGdzPdwzSiaz88xvicfibwlfWx4GPRibu2LqlVkehM01Dupgqsg/132"
      // language: "zh_CN"
      // nickname: "孙玉建🍁"
      // openid: "oy0LW1OyCoOud5q_WUXy_5dRi9fs"
      // privilege: []
      // province: "Shanghai"
      // sex: 1
      // unionid: "o0F120o1TuVsX5Ew_gS1yozvWk3w"
      const { city, country, headimgurl, language, nickname, privilege, province, sex } = data
      this.city = city
      this.country = country
      this.headimgurl = headimgurl
      this.language = language
      this.nickname = nickname
      this.privilege = privilege
      this.province = province
      this.sex = sex
      this.props.navigation.navigate("BindLogin", {
        access_token: this.access_token,
        openid: this.openid,
        refresh_token: this.refresh_token,
        unionid: this.unionid,
        city: this.city,
        country: this.country,
        headimgurl: this.headimgurl,
        language: this.language,
        nickname: this.nickname,
        privilege: this.privilege || this.privilege[0] || "",
        province: this.province,
        sex: this.sex
        //     this.access_token = null
        // this.openid = null
        // this.refresh_token = null
        // this.unionid = null
        // this.city = null
        // this.country = null
        // this.headimgurl = null
        // this.language = null
        // this.nickname = null
        // this.privilege = null
        // this.province = null
        // this.sex = 1
      })
      return;
    }
    ToastUtil.fail('请求失败')
  }

  loginByPhone() {
    // console.log('loginData', AesEncrypt('unixtime=1547547768&unionId=oucl8s9Mv4FqxVK9fKu7G-5A_e_0&diskId=T7G0215520000435faaa01e17d7ef281&version=1.14'))
    const timestamp = Date.parse(new Date()) / 1000
    const passwordMd5 = MD5.b64_md5(this.state.password) + '=='
    const loginData = `unixtime=${timestamp}&m=${this.state.phone}&p=${passwordMd5}&diskId=T7G0215520000435faaa01e17d7ef281&version=1.14&unionId=&openId=&appId=&nickName=&sex=1&country=&province=&city=&headImgUrl=&privilege=&refreshToken=`
    console.log('loginData', loginData)
    const data = {
      LoginSvcID: 1,
      EncParms: AesEncrypt(loginData)
    }
    const callBack = this.loginSuccess.bind(this)
    actionUtil(ActionTypes.LOGIN_ACTION, { data, callBack })
    // SpinnerLoadView.show()
  }

  wxLogin(unionId) {
    LocalStore._storeData('wxUnionId', unionId)
    const timestamp = Date.parse(new Date()) / 1000
    const wxLoginData = `unixtime=${timestamp}&unionId=${unionId}&diskId=T7G0215520000435faaa01e17d7ef281&version=1.14`
    const data = {
      LoginSvcID: 1,
      EncParms: AesEncrypt(wxLoginData)
    }
    const callBack = this.wxLoginSuccess.bind(this)
    actionUtil(ActionTypes.WX_LOGIN, { data, callBack })
  }

  wxLoginSuccess({ State, Data }, error) {
    console.log('wxLoginSuccess',State, Data, error)
    if (State == 0) {
      this.getWXUserInfo(this.access_token, this.openid)
      // 需要绑定
    } else if (State == 1) {
      console.log('wxlogin success')
      const { SessionID } = Data
      global.SessionID = SessionID
      global.globalServer = Data['Server']
      console.log('globas, sessionid', global.SessionID)
      ToastUtil.message('登录成功')
      LocalStore._storeData('isWeixinLogin', 'true')
      DeviceEventEmitter.emit('dataAdjust')
      this.getUserInfo()
      this.props.navigation.goBack()
    }
  }
}

export default Login;