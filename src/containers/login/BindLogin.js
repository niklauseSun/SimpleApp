import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Keyboard } from "react-native";
import { SafeAreaView } from 'react-navigation'
import { NavHeader, BlueButton, LineInput } from "../../components";
import { px, ToastUtil, AesEncrypt, LocalStore } from '../../utils'
import { AssetImages, ActionTypes } from '../../constants'
import { E } from '../../config'
import MD5 from 'react-native-md5'

class BindLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: null,
      password: null
    };
  }

  componentDidMount() {
  }

  render() {
    return <SafeAreaView style={{ flex: 1, backgroundColor: "#123D70" }}>
      <NavHeader title="绑定手机号" showBackButton={true} navigation={this.props.navigation} />
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
        <View style={{ flexDirection: "row", marginTop: px(64), alignItems: 'center', marginLeft: px(32) }}>
          <View style={{ flex: 1, }}>

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
          title="绑定"
          backgroundStyle={{ width: px(686), marginTop: px(48) }}
          onPress={this.bindWxLogin.bind(this)}
        />
        </TouchableOpacity>
    </SafeAreaView>;
  }

  changePhoneNum(val) {
    this.setState({
      phone: val
    })
  }

  changePassword(val) {
    this.setState({
      password: val
    })
  }

  changeSelectStatus(flag) {
    this.setState({
      isChecked: flag
    })
  }

  bindWxLogin() {
    const { unionid, openid, appId, nickname, sex, province, country, city, headimgurl, privilege, refresh_token } = this.props.navigation.state.params || {}
    // access_token: this.access_token,
    //   openid: this.openid,
    //     refresh_token: this.refresh_token,
    //       unionid: this.unionid,
    //         city: this.city,
    //           country: this.country,
    //             headimgurl: this.headimgurl,
    //               language: this.language,
    //                 nickname: this.nickname,
    //                   privilege : this.privilege[0] || "",
    //                     province: this.province,
    //                       sex: this.sex
    const timestamp = Date.parse(new Date()) / 1000
    const password = MD5.b64_md5(this.state.password) + '=='
    const loginData = `unixtime=${timestamp}&m=${this.state.phone}&p=${password}&diskId=T7G0215520000435faaa01e17d7ef281&version=1.14&unionId=${unionid}&openId=${openid}&appId=${E.WECHAT_APP_ID}&nickName=${nickname}&sex=${sex}&country=${country}&province=${province}&city=${city}&headImgUrl=${headimgurl}&privilege=${privilege}&refreshToken=${refresh_token}`

    const data = {
      "LoginSvcID": 1,
      "EncParms": AesEncrypt(loginData)
    }
    const callBack = this.loginSuccess.bind(this)
    actionUtil(ActionTypes.LOGIN_ACTION, { data, callBack })
  }

  loginSuccess(Data, error) {
    if (Data) {
      // login Success
      LocalStore._storeData('isWeixinLogin', 'true')
      this.getUserInfo()
      this.props.navigation.popToTop()
      ToastUtil.message('登录成功')
      actionUtil(ActionTypes.SET_RELOAD_STATUE)
      return;
    } else {
      ToastUtil.fail('登录失败')
    }

  }

  getUserInfo() {
    const data = {}
    actionUtil(ActionTypes.GET_USERINFO, { data })
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default BindLogin;
