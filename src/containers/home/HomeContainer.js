import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  DeviceEventEmitter
} from "react-native";
import { BlueButton, NavHeader } from "../../components";
import { px, ToastUtil, LocalStore, AesEncrypt } from '../../utils'
import { SafeAreaView } from 'react-navigation'
import { AssetImages, ActionTypes } from '../../constants';
import { connect } from 'react-redux';
import MD5 from 'react-native-md5'
import DeviceInfo from 'react-native-device-info';
import { E } from '../../config';
// import ActionSheet from 'react-native-actionsheet'
import Picker from 'react-native-picker';

class HomeContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // globalVersion: global.serverVersion
      medicines: [],
      selectName: null
    };
  }

  componentWillMount() {
    this.autoLogin()
    this.weixinAutoLogin()
    // console.log('picker', Picker)
    this.picker = Picker
  }

  componentDidMount() {
    this.dataAdjust = DeviceEventEmitter.addListener('dataAdjust', (e) => {
      this.getMedicines()
    })
  }

  render() {
    if (E.IS_IOS) {
      // 用于记录
      return <SafeAreaView style={styles.container}>
        <NavHeader title="首页" />
        <View style={styles.content}>
          <View style={{ width: '100%', height: px(60) }}>
            <TouchableOpacity
              style={{ width: px(126), height: px(60), alignItems: 'center', marginLeft: px(32), flexDirection: 'row' }}
              onPress={() => {
                // this.ActionSheet.show()
                this.picker.show()
              }}
            >
              <Text style={{ color: 'white' }}>万古霉素</Text>
              <Image source={AssetImages.ICON_ARROW_DOWN_WHITE} style={{ width: px(32), height: px(32), marginLeft: px(16) }} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              this.navigateToBeginPage()
            }}
            activeOpacity={0.7} style={styles.beginButton}>
            <View style={styles.leftView}>
              <Text style={styles.calTitle}>剂量记录</Text>
              <Image source={AssetImages.ICON_ARROW_RIGHT} style={styles.arrow_right} />
            </View>
            <Image source={AssetImages.ICON_YAO} style={styles.icon_medicine} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.navigateToAdjustPage();
            }}
            activeOpacity={0.7} style={styles.adjustButton}>
            <View style={styles.leftView}>
              <Text style={styles.calTitle}>浓度记录</Text>
              <Image source={AssetImages.ICON_ARROW_RIGHT} style={styles.arrow_right} />
            </View>
            <Image source={AssetImages.ICON_PING} style={styles.icon_medicine} />
          </TouchableOpacity>
          
        </View>
      </SafeAreaView>;
    } else {
      // 用于计算
      if (this.props.isLogin) {
        return <SafeAreaView style={styles.container}>
          <NavHeader title="首页" />
          <View style={styles.content}>
            <View style={{ width: '100%', height: px(60) }}>
              <TouchableOpacity
                style={{ width: px(126), height: px(60), alignItems: 'center', marginLeft: px(32), flexDirection: 'row'}}
                onPress={() => {
                  // this.ActionSheet.show()
                  this.picker.show()
                }}
              >
                <Text style={{ color: 'white' }}>万古霉素</Text>
                <Image source={AssetImages.ICON_ARROW_DOWN_WHITE} style={{ width: px(32), height: px(32), marginLeft: px(16)}}/>
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity
              onPress={() => {
                this.navigateToBeginPage()
              }}
              activeOpacity={0.7} style={styles.beginButton}>
              <View style={styles.leftView}>
                <Text style={styles.calTitle}>剂量计算</Text>
                <Image source={AssetImages.ICON_ARROW_RIGHT} style={styles.arrow_right} />
              </View>
              <Image source={AssetImages.ICON_YAO} style={styles.icon_medicine} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.navigateToAdjustPage();
              }}
              activeOpacity={0.7} style={styles.adjustButton}>
              <View style={styles.leftView}>
                <Text style={styles.calTitle}>浓度预测</Text>
                <Image source={AssetImages.ICON_ARROW_RIGHT} style={styles.arrow_right} />
              </View>
              <Image source={AssetImages.ICON_PING} style={styles.icon_medicine} />
            </TouchableOpacity>
            <View style={{ flex: 1}} />
            <View style={{ padding: px(32), backgroundColor: '#203D6A' }}>
              <Text style={{ color: '#8697AD', lineHeight: px(48), fontSize: px(24) }}>本程序为个体化给药的辅助工具，仅为临床医师或药师在个体化精准治疗提供剂量或浓度的参考，并不能替代临床医师或者药师的临床决策。本程序对预测及计算结果不承担法律责任。通过任何形式使用本程序即视为同意此声明。</Text>
            </View>
            {/* <ActionSheet
              ref={o => this.ActionSheet = o}
              title={'Which one do you like ?'}
              options={['Apple', 'Banana', 'cancel']}
              cancelButtonIndex={2}
              destructiveButtonIndex={1}
              onPress={(index) => { /* do something */ }
          </View>
        </SafeAreaView>;
      } else {
        return (
          <SafeAreaView style={styles.container}>
            <NavHeader title="首页" />
            <View style={styles.content}>
              <Image style={styles.nullImage} source={AssetImages.IMAGE_NULL} />
              <Text style={styles.loginTip}>登录后可以开始数据计算</Text>
              <BlueButton
                onPress={() => {
                  this.props.navigation.push("Login");
                }}
                style={styles.loginButton}
                backgroundStyle={styles.loginButtonBg}
                title="立即登录"
              />
            </View>
          </SafeAreaView>
        );
      }
    }
    console.log('home container', global.serverVersion)
    
  }

  _renderRecording() {
    return (
      <View style={styles.content}>
        <TouchableOpacity
          onPress={() => {
            this.navigateToBeginPage()
          }}
          activeOpacity={0.7} style={styles.beginButton}>
          <View style={styles.leftView}>
            <Text style={styles.calTitle}>初始剂量记录</Text>
            <Image source={AssetImages.ICON_ARROW_RIGHT} style={styles.arrow_right} />
          </View>
          <Image source={AssetImages.ICON_YAO} style={styles.icon_medicine} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.navigateToAdjustPage();
          }}
          activeOpacity={0.7} style={styles.adjustButton}>
          <View style={styles.leftView}>
            <Text style={styles.calTitle}>调整剂量记录</Text>
            <Image source={AssetImages.ICON_ARROW_RIGHT} style={styles.arrow_right} />
          </View>
          <Image source={AssetImages.ICON_PING} style={styles.icon_medicine} />
        </TouchableOpacity>
      </View>
    )
  }

  _renderCalculate() {
    return (
      <View style={styles.content}>
        <TouchableOpacity
          onPress={() => {
            this.navigateToBeginPage()
          }}
          activeOpacity={0.7} style={styles.beginButton}>
          <View style={styles.leftView}>
            <Text style={styles.calTitle}>初始剂量计算</Text>
            <Image source={AssetImages.ICON_ARROW_RIGHT} style={styles.arrow_right} />
          </View>
          <Image source={AssetImages.ICON_YAO} style={styles.icon_medicine} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.navigateToAdjustPage();
          }}
          activeOpacity={0.7} style={styles.adjustButton}>
          <View style={styles.leftView}>
            <Text style={styles.calTitle}>调整剂量计算</Text>
            <Image source={AssetImages.ICON_ARROW_RIGHT} style={styles.arrow_right} />
          </View>
          <Image source={AssetImages.ICON_PING} style={styles.icon_medicine} />
        </TouchableOpacity>
      </View>
    )
  }

  showActionSheet = () => {
    console.log('showActionSheet', ActionSheet)
    
    // const BUTTONS = ['Operation1', 'Operation2', 'Operation2', 'Delete', 'Cancel'];
    // ActionSheet.showActionSheetWithOptions({
    //   options: BUTTONS,
    //   cancelButtonIndex: BUTTONS.length - 1,
    //   destructiveButtonIndex: BUTTONS.length - 2,
    //   // title: 'title',
    //   message: 'I am description, description, description',
    //   maskClosable: true,
    //   'data-seed': 'logId',
    // },
    // (buttonIndex) => {
    //   // this.setState({ clicked: BUTTONS[buttonIndex] });
    // });
  }

  navigateToBeginPage () {
    const type = 0
    this.props.navigation.push("CalculatePage", {
      calculateType: type
    });
  }

  navigateToAdjustPage() {
    const type = 1
    this.props.navigation.push("CalculatePage", {
      calculateType: type
    });
  }

  autoLogin() {
    LocalStore._getData('passwordSaved').then((isSaved) => {
      if (isSaved) {
        LocalStore._getData('phone').then((phone) => {
          if (phone == null) {
            return;
          }
          LocalStore._getData('password').then((password) => {
            this.loginAction(phone, password)
          })
        })
      }
    })
  }

  weixinAutoLogin() {
    LocalStore._getData('isWeixinLogin').then((isWeixinLogin) => {
      // console.log('isWeixinLogin', isWeixinLogin)
      if (isWeixinLogin == null) return;
      if (isWeixinLogin == 'true') {
        LocalStore._getData('wxUnionId').then((unionId) => {
          // console.log('wxUnionId', unionId)
          if (unionId == null) return;
          this.wxLogin(unionId)
        })
      }
    })
  }

  loginAction(phone, password) {
    const timestamp = Date.parse(new Date()) / 1000
    const passwordMd5 = MD5.b64_md5(password) + '=='
    const loginData = `unixtime=${timestamp}&m=${phone}&p=${passwordMd5}&diskId=T7G0215520000435faaa01e17d7ef281&version=1.14&unionId=&openId=&appId=&nickName=&sex=1&country=&province=&city=&headImgUrl=&privilege=&refreshToken=`

    const data = {
      LoginSvcID: 1,
      EncParms: AesEncrypt(loginData)
    }
    const callBack = this.loginSuccess.bind(this)
    actionUtil(ActionTypes.LOGIN_ACTION, { data, callBack })
    // SpinnerLoadView.show()
  }

  wxLogin(unionId) {
    const timestamp = Date.parse(new Date()) / 1000
    const wxLoginData = `unixtime=${timestamp}&unionId=${unionId}&diskId=T7G0215520000435faaa01e17d7ef281&version=1.14`
    const data = {
      LoginSvcID: 1,
      EncParms: AesEncrypt(wxLoginData)
    }
    const callBack = this.wxLoginSuccess.bind(this)
    actionUtil(ActionTypes.WX_LOGIN, { data, callBack })
  }

  loginSuccess(data, error) {
    if (data) {
      ToastUtil.message('登录成功')
      DeviceEventEmitter.emit('dataAdjust')
      this.getUserInfo()
    }
  }

  wxLoginSuccess({ State, Data }, error) {
    // console.log('wxLoginSuccess', State, Data, error)
    if (State == 0) {
      this.getWXUserInfo(this.access_token, this.openid)
      // 需要绑定
    } else if (State == 1) {
      // console.log('wxlogin success', Data)
      const { SessionID } = Data
      global.SessionID = SessionID
      global.globalServer = Data['Server']
      ToastUtil.message('登录成功')
      // LocalStore._storeData('isWeixinLogin', 'true')
      DeviceEventEmitter.emit('dataAdjust')
      this.getUserInfo()
      // this.props.navigation.goBack()
    }
  }

  getUserInfo() {
    const data = {}
    actionUtil(ActionTypes.GET_USERINFO, { data })
  }

  getMedicines() {
    const data = {}
    const callBack = this.getMedicinesSuccess.bind(this)
    actionUtil(ActionTypes.GET_MEDICINES, { data, callBack })
  }

  getMedicinesSuccess(Data, error) {
    console.log('getMedicinesSuccess', Data)
    if (Data) {
      this.setState({
        medicines: Data
      })
      // console.log('pickersss', this.picker, Picker, Data)
      const nameData = []
      for (let i=0;i<Data.length;i++) {
        nameData.push(Data[i].Name)
      }

      console.log('nameData', nameData)
      if (E.IS_IOS) {
        this.picker.init({
          pickerData: nameData,
          pickerTitleText: '',
          pickerConfirmBtnText: '完成',
          pickerCancelBtnText: '取消',
          pickerConfirmBtnColor: [51, 51, 51, 1],
          pickerCancelBtnColor: [51, 51, 51, 1],
          selectedValue: [this.state.selectName],
          onPickerConfirm: data => {
            console.log('confirm', data);
            this.setState({
              selectName: data
            })
          },
          onPickerCancel: data => {
            console.log(data);
          },
          onPickerSelect: data => {
            console.log(data);
          }
        });

      } else {
        this.picker.init({
          pickerData: nameData,
          pickerTitleText: null,
          pickerConfirmBtnText: '完成',
          pickerCancelBtnText: '取消',
          pickerConfirmBtnColor: [51, 51, 51, 1],
          pickerCancelBtnColor: [51, 51, 51, 1],
          selectedValue: [this.state.selectName],
          onPickerConfirm: data => {
            console.log('confirm', data);
            this.setState({
              selectName: data
            })
          },
          onPickerCancel: data => {
            console.log(data);
          },
          onPickerSelect: data => {
            console.log(data);
          }
        });

      }
      
    }
  }

  componentWillUnmount() {
    this.dataAdjust.remove();
  }

  // getServerVersion() {
  //   // console.log('getServerVersion', DeviceInfo.getVersion())
  //   LocalStore._getData('serverVersion').then((val) => {
  //     if (val != null) {
  //       if (val == 'true') {
  //         global.serverVersion = true;
  //         this.setState({
  //           globalVersion: true
  //         })
  //       } else if (val == 'false') {
  //         global.serverVersion = false;
  //         this.setState({
  //           globalVersion: false
  //         })
  //       }
  //     }
  //   })
  //   const callBack = this.getVersionSuccess.bind(this)
  //   actionUtil(ActionTypes.GET_SERVER_VERSION, { callBack })
  // }

  // getVersionSuccess(Data, error) {
  //   console.log('getVersionSuccess', Data)
  //   if (Data) {
  //     const { ClientVersions } = Data
  //     if (ClientVersions.indexOf(DeviceInfo.getVersion()) != -1) {
  //       global.serverVersion = true;
  //       this.setState({
  //         globalVersion: true
  //       })
  //       LocalStore._storeData('serverVersion', 'true')
  //     } else {
  //       global.serverVersion = false
  //       this.setState({
  //         globalVersion: false
  //       })
  //       LocalStore._storeData('serverVersion', 'false')
  //     }
  //   }
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#123D70"
  },
  header: {
    height: px(60),
    marginTop: px(80),
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: px(38),
    color: "#fff"
  },
  content: {
    flex: 1,
    alignItems: "center"
  },
  beginButton: {
    marginTop: px(32),
    width: px(686),
    height: px(272),
    borderRadius: px(8),
    backgroundColor: "#2E6BE6",
    flexDirection: "row",
    alignItems: "center"
  },
  adjustButton: {
    marginTop: px(32),
    width: px(686),
    height: px(272),
    borderRadius: px(8),
    backgroundColor: "#2996CC",
    flexDirection: "row",
    alignItems: "center"
  },
  leftView: {
    flex: 1,
    marginLeft: px(32)
  },
  arrow_right: {
    width: px(40),
    height: px(40),
    marginTop: px(48)
  },
  icon_medicine: {
    height: px(160),
    width: px(160),
    marginRight: px(30),
    resizeMode: 'contain'
  },
  calTitle: {
    color: '#FFF',
    fontSize: px(40)
  },
  loginTip: {
    marginBottom: px(80),
    fontSize: px(28),
    color: '#fff'
  },
  loginButton: {},
  loginButtonBg: {
    width: px(480),
    height: px(100)
  },
  nullImage: {
    marginTop: px(190),
    width: px(300),
    height: px(300),
    marginBottom: px(45)
  }
});

export default connect(state => ({
    isLogin: state.login.isLogin
  })
)(HomeContainer)