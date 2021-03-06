import { Dimensions, PixelRatio, Platform } from "react-native";


export default {
  DEBUG: true,

  WIDTH: Dimensions.get('window').width,
  HEIGHT: Dimensions.get('window').height,

  // 系统是iOS
  IS_IOS: (Platform.OS === 'ios'),
  // 测试
  // SERVER_HOME: 'https://wangu.91xiaoapp.com:8081/Huashan.WebAPI/',
  // release
  SERVER_HOME: 'https://wangu.91xiaoapp.com/Huashan.WebAPI/',

  VERSION: '1.1.2',

  // 微信
  WECHAT_APP_ID: 'wxea535c9d15180464',
  WECHAT_INSTALLED: false,
  WECHAT_APP_SECRET: '009433c255828647797afa103f9f32ce'
}
