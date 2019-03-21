import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, DeviceEventEmitter } from "react-native";
import { SafeAreaView } from 'react-navigation'
import { NavHeader, SimpleItem, LineView } from "../../components";
import { px, LocalStore, ToastUtil } from "../../utils";
import { ActionTypes } from "../../constants";

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    return <SafeAreaView style={styles.container}>
        <NavHeader title="设置" showBackButton={true} navigation={this.props.navigation} />
        <View style={styles.content}>
          <View style={styles.setView}>
            <SimpleItem title="版本" subTitle="1.1.0" />
            <LineView />
            <TouchableOpacity
              onPress={() => {
                LocalStore._removeData('passwordSaved')
                LocalStore._removeData('phone')
                LocalStore._removeData('password')
                LocalStore._removeData('isWeixinLogin')
                LocalStore._removeData('wxUnionId')
                actionUtil(ActionTypes.LOGOUT)
                actionUtil(ActionTypes.LOGOUT_ACTION, {})
                DeviceEventEmitter.emit('logoutListener')
                global.SessionID = null
                global.globalServer = null
                ToastUtil.message('退出登录成功！')
                this.props.navigation.goBack()
              }}
              style={styles.logoutButton}>
              <Text style={styles.logoutTitle}>退出登录</Text>
            </TouchableOpacity>
          </View>
          <View style={{width: px(686),
            marginTop: px(32),
            backgroundColor: "#fff",
            borderRadius: px(8),
            paddingTop: px(24),
            paddingLeft: px(32),
            paddingRight: px(32),
            paddingBottom: px(24)}}>
            <Text style={{ fontSize: px(24), lineHeight: px(48), color: '#666'}}>本APP计算公式和建模数据库均出自Clin Infect Dis杂志2018年第67卷(增刊第2期)，临床研究见S249-S255页，模型分析见S256-S262页。</Text>
          </View>
        </View>
      </SafeAreaView>;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#123D70",
    flex: 1
  },
  content: {
    flex: 1,
    alignItems: "center"
  },
  setView: {
    width: px(686),
    height: px(225),
    backgroundColor: "#fff",
    borderRadius: px(8),
    marginTop: px(32)
  },
  logoutButton: {
    justifyContent: "center",
    height: px(112),
    borderRadius: px(8)
  },
  logoutTitle: {
    marginLeft: px(32),
    fontSize: px(32)
  }
});

export default Logout;
