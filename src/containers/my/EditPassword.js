import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import { SafeAreaView } from 'react-navigation'
import { NavHeader, LineView, BlueButton } from "../../components";
import { px, ToastUtil } from "../../utils";
import MD5 from 'react-native-md5'
import { ActionTypes, AssetImages } from "../../constants";

class EditPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: true,
      oldText: null,
      newText: null,
      confirmText: null
    };
  }

  componentDidMount() {
  }

  render() {
    const headTitle = this.state.isEdit ? '修改密码': '修改成功'

    if (!this.state.isEdit) {
      return <SafeAreaView style={styles.container}>
        <NavHeader title={headTitle} showBackButton={true} navigation={this.props.navigation} />
        <View style={{ flex: 1, alignItems: 'center'}}>
          <Image style={{ marginTop: px(64), width: px(160), height: px(160)}} source={AssetImages.IMAGE_FINISH}/>
          <Text style={{ color: '#fff', fontSize: px(40), marginTop: px(48)}}>修改成功</Text>
          <Text style={{ color: '#eaeaea', fontSize: px(28), marginTop: px(24), marginBottom: px(64)}}>你的密码已修改成功，请牢记密码</Text>
          <BlueButton backgroundStyle={{ width: px(686) }} title="返回首页" onPress={() => {
            this.props.navigation.popToTop()
          }}/>
        </View>
      </SafeAreaView>
    }

    return <SafeAreaView style={styles.container}>
      <NavHeader title={headTitle} showBackButton={true} navigation={this.props.navigation} />
      <View style={styles.passwordView}>
        <TextInput
        onChangeText={this.changeOldText.bind(this)}
          style={styles.inputStyle} placeholder="旧密码"/>
        <LineView />
        <TextInput
        onChangeText={this.changeNewText.bind(this)}
          style={styles.inputStyle} placeholder="新密码"/>
        <LineView />
        <TextInput
        onChangeText={this.confirmText.bind(this)}
          style={styles.inputStyle} placeholder="确认新密码"/>
      </View>
      <BlueButton
        onPress={() => {
          this.updatePassword()
        }}
        backgroundStyle={styles.confirmButton} title="确定"/>
    </SafeAreaView>;
  }

  changeOldText(val) {
    this.setState({
      oldText: val
    })
  }

  changeNewText(val) {
    this.setState({
      newText: val
    })
  }

  confirmText(val) {
    this.setState({
      confirmText: val
    })
  }

  updatePassword() {
    if (this.state.oldText.trim().length == 0 ||
    this.state.newText.trim().length == 0 ||
    this.state.confirmText.trim().length == 0) {
      ToastUtil.fail('请输入完整信息！')
      return;
    }
    if (this.state.confirmText == this.state.newText) {
      if (this.state.oldText == this.state.newText) {
        ToastUtil.fail('新旧密码一致，请输入其他密码！')
        return;
      }
      const data = {
        OldPwd: MD5.b64_md5(this.state.oldText) + '==',
        NewPwd: MD5.b64_md5(this.state.newText) + '=='
      }
      const callBack = this.updateSuccess.bind(this)
      actionUtil(ActionTypes.UPDATE_PASSWORD, { data, callBack})
    } else {
      ToastUtil.fail('请确认新密码！')
      return;
    }
  }

  updateSuccess( Data, error) {
    if (Data) {
      this.setState({
        isEdit: false
      })
      return;
    } else {
      ToastUtil.fail(error)
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#123D70",
    alignItems: "center"
  },
  passwordView: {
    width: px(686),
    height: px(338),
    borderRadius: px(8),
    backgroundColor: "#fff",
    marginTop: px(32)
  },
  inputStyle: {
    height: px(112),
    width: "100%",
    marginLeft: px(32)
  },
  confirmButton: {
    width: px(686),
    marginTop: px(32)
  }
});

export default EditPassword;
